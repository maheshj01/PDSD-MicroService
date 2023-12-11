// db.ts
import { Pool } from 'pg';

const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT) || 5432;
const database = process.env.DB_NAME || 'request_service';
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const pool = new Pool({
    host: host,
    port: port,
    database: database,
    user: username,
    password: password,
});

export default pool;