import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'supersecret',
  database: process.env.DB_NAME || 'n8n',
  connectionTimeoutMillis: 5000,
});

export default pool;