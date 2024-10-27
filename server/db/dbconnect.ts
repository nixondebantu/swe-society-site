import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

const connectionString = "postgresql://postgres.oszveqopythlwzqzykjt:G3jRpdr!fnsx.HC@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";//process.env.DB_URL;

const pool = new Pool({
    connectionString: connectionString
});

export async function testDatabaseConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export async function connectToDB() {
    try {
        await pool.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
}

export default pool;
