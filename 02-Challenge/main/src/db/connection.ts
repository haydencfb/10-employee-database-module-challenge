import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432
}); 

const connectToDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }
};

export { pool, connectToDB };