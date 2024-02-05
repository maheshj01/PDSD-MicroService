// src/database/Database.ts
import { Pool, PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private pool: Pool;
    private client!: PoolClient;

    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    async connect(): Promise<void> {
        this.client = await this.pool.connect();
    }

    async executeQuery(query: string, values: any[] = []): Promise<QueryResult> {
        try {
            await this.client.query('BEGIN');

            const result = await this.client.query(query, values);

            await this.client.query('COMMIT');

            return result;
        } catch (error) {
            await this.client.query('ROLLBACK');
            throw error;
        }
    }

    async beginTransaction(): Promise<void> {
        await this.client.query('BEGIN');
    }

    async commitTransaction(): Promise<void> {
        await this.client.query('COMMIT');
    }

    async rollbackTransaction(): Promise<void> {
        await this.client.query('ROLLBACK');
    }

    async executeTransaction(query: string, values: any[] = []): Promise<QueryResult> {
        return this.client.query(query, values);
    }

    async close(): Promise<void> {
        this.client.release();
        await this.pool.end();
    }
}

export default new Database();
