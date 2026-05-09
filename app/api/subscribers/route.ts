import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT email FROM subscribers WHERE is_active = true ORDER BY created_at DESC'
    );
    return NextResponse.json({ subscribers: result.rows });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ subscribers: [] });
  }
}