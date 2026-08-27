import { Pool } from 'pg';
export const dynamic = 'force-dynamic';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true }, // Безпека: перевірка SSL-сертифікатів для захисту від MITM-атак
  connectionTimeoutMillis: 15000, // Стабільність: збільшено таймаут для холодного старту сервера та великих запитів
});

export default pool;