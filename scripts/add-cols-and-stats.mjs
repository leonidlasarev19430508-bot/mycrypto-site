import { readFileSync } from 'fs';
import { Pool } from 'pg';
const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

// 1 — add columns (idempotent)
await pool.query(`ALTER TABLE ai_news ADD COLUMN IF NOT EXISTS full_article_pl TEXT`);
await pool.query(`ALTER TABLE ai_news ADD COLUMN IF NOT EXISTS full_article_de TEXT`);
console.log('Columns full_article_pl / full_article_de ensured.');

// 2 — stats on translatable rows
const r = await pool.query(`
  SELECT
    COUNT(*) FILTER (WHERE full_article_en IS NOT NULL AND length(trim(full_article_en)) > 50) AS translatable,
    COALESCE(SUM(length(full_article_en)) FILTER (WHERE full_article_en IS NOT NULL AND length(trim(full_article_en)) > 50), 0) AS total_chars,
    COALESCE(AVG(length(full_article_en)) FILTER (WHERE full_article_en IS NOT NULL AND length(trim(full_article_en)) > 50), 0) AS avg_chars,
    COALESCE(MAX(length(full_article_en)), 0) AS max_chars,
    COUNT(*) FILTER (WHERE full_article_pl IS NOT NULL) AS already_pl,
    COUNT(*) FILTER (WHERE full_article_de IS NOT NULL) AS already_de
  FROM ai_news
`);
console.log(JSON.stringify(r.rows[0], null, 2));
await pool.end();
