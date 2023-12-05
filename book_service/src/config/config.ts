// src/config/config.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
} = process.env;

const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432', 10),
});

export { pool };
