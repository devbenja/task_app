import pg from 'pg';
import { config } from 'dotenv';

config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const connection = async () => {
    try {
        await pool.connect();
        console.log('>>> Conexion Establecida');
    } catch ( error ) {
        console.log( error );
    }
}
