// Translate full_article_en -> Polish (full_article_pl) and German (full_article_de)
// for every ai_news row that has a non-empty English article.
//
// - Processes in batches of 10 (concurrent within a batch) to avoid overloading the API
// - Logs progress per batch and per article
// - Skips rows with empty/short full_article_en
// - Resumable: skips rows already translated (full_article_pl AND full_article_de set)
// - Saves each translation to the DB immediately after it returns
//
// Usage: node scripts/translate-articles.mjs
import { readFileSync } from 'fs';
import { Pool } from 'pg';
import Anthropic from '@anthropic-ai/sdk';

// Load env from .env.local
const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const MODEL = 'claude-haiku-4-5';
const BATCH_SIZE = 10;

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are a professional translator for a cryptocurrency news website.
Translate the English article the user provides into Polish and German.
Rules:
- Preserve the meaning, tone, paragraph breaks, numbers, tickers and any markdown.
- Translate naturally and fluently — do not translate word-for-word.
- Do NOT add any commentary, titles, or notes that are not in the source.
- Return ONLY a JSON object of the exact form {"pl": "<polish>", "de": "<german>"} and nothing else.`;

function parseTranslation(text) {
  // Strip code fences if present, then extract the JSON object.
  const cleaned = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('no JSON object in response');
  const obj = JSON.parse(cleaned.slice(start, end + 1));
  if (typeof obj.pl !== 'string' || typeof obj.de !== 'string') throw new Error('missing pl/de keys');
  if (!obj.pl.trim() || !obj.de.trim()) throw new Error('empty pl/de translation');
  return obj;
}

let inTokens = 0, outTokens = 0, ok = 0, failed = 0;
const failures = [];

async function translateAndSave(article) {
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: SYSTEM,
    messages: [{ role: 'user', content: article.full_article_en }],
  });
  inTokens += msg.usage.input_tokens;
  outTokens += msg.usage.output_tokens;

  const textBlock = msg.content.find(b => b.type === 'text');
  const { pl, de } = parseTranslation(textBlock ? textBlock.text : '');

  await pool.query(
    `UPDATE ai_news SET full_article_pl = $1, full_article_de = $2 WHERE id = $3`,
    [pl, de, article.id]
  );
  ok++;
  console.log(`  ✓ #${article.id} (pl ${pl.length}c / de ${de.length}c)`);
}

async function main() {
  const { rows } = await pool.query(`
    SELECT id, full_article_en
    FROM ai_news
    WHERE full_article_en IS NOT NULL
      AND length(trim(full_article_en)) > 50
      AND (full_article_pl IS NULL OR full_article_de IS NULL)
    ORDER BY id
  `);
  console.log(`Articles to translate: ${rows.length} (model: ${MODEL}, batch size: ${BATCH_SIZE})`);

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    console.log(`\nBatch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(rows.length / BATCH_SIZE)} — articles ${i + 1}–${i + batch.length}`);
    await Promise.all(batch.map(async (a) => {
      try {
        await translateAndSave(a);
      } catch (e) {
        failed++;
        failures.push(a.id);
        console.log(`  ✗ #${a.id} failed: ${e.message}`);
      }
    }));
    console.log(`  Progress: ${ok} done, ${failed} failed, ${rows.length - ok - failed} remaining`);
  }

  const cost = (inTokens / 1e6) * 1 + (outTokens / 1e6) * 5; // Haiku 4.5: $1 in / $5 out per MTok
  console.log(`\n=== Done ===`);
  console.log(`Translated: ${ok}  Failed: ${failed}`);
  if (failures.length) console.log(`Failed IDs (re-run to retry): ${failures.join(', ')}`);
  console.log(`Tokens: input ${inTokens.toLocaleString()}, output ${outTokens.toLocaleString()}`);
  console.log(`Actual cost: $${cost.toFixed(2)}`);

  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
