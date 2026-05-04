import { NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW() as time');
    return NextResponse.json({ 
      success: true, 
      time: result.rows[0].time,
      message: 'Підключення до БД успішне!'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}