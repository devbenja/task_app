import pg from 'pg';
import { PG_PORT, PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE } from './config.js';

//import { config } from 'dotenv';
//config();

export const pool = new pg.Pool({
    port: PG_PORT,
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
});

pool.on('connect', () => {
    console.log('Database Conected');
});


