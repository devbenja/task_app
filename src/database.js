import pg from 'pg';
import { config } from 'dotenv';

config();

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

pool.on('connect', () => {
    console.log('Database Conected');
});


