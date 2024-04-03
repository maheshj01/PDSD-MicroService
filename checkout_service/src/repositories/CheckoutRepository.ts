// src/repositories/CheckoutRepositoryDB.ts

import { Pool, PoolClient, QueryResult } from 'pg';
import axios from 'axios';
import { Checkout } from '../models/Checkout';
import dotenv from 'dotenv';

dotenv.config();

export class CheckoutRepositoryDB {
    private pool: Pool;
    private client: PoolClient;
    private transactionInProgress: boolean;
    constructor() {
        this.client = {} as PoolClient;
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });
        this.transactionInProgress = false;
        this.connect(); // Connect to the database when the class is instantiated
    }

    private connect(): void {
        this.pool.connect((err, client, done) => {
            if (err) throw err;
            this.client = client!;
            console.log('Connected to the Checkout database');
        });
    }

    public async disconnect(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Disconnected from the database');
        } catch (err: any) {
            console.error('Error disconnecting from the database:', err.message);
        }
    }

    public async beginTransaction(): Promise<void> {
        if (this.transactionInProgress) {
            throw new Error('Transaction already in progress');
        }
        await this.client.query('BEGIN');
        this.transactionInProgress = true;
    }

    public async commitTransaction(): Promise<void> {
        if (!this.transactionInProgress) {
            throw new Error('No transaction in progress');
        }
        await this.client.query('COMMIT');
        this.transactionInProgress = false;
    }

    public async rollbackTransaction(): Promise<void> {
        if (!this.transactionInProgress) {
            throw new Error('No transaction in progress');
        }
        await this.client.query('ROLLBACK');
        this.transactionInProgress = false;
    }


    public async storeCheckout(checkout: Checkout): Promise<Checkout> {

        try {
            await this.client.query('BEGIN');

            // Make a request to the Book Service API to get available copies
            const bookSearchApiUrl = process.env.BOOKS_SERVICE_BASE_URL + `/api/books/search?id=${checkout.book_id}`
            const bookInfoResponse = await axios.get(bookSearchApiUrl);

            if (bookInfoResponse.status !== 200) {
                console.error(`Failed to retrieve book information. Status Code: ${bookInfoResponse.status}`);
                throw new Error('Failed to retrieve book information');
            }

            const bookInfo = bookInfoResponse.data;
            const availableCopies = bookInfo.availableCopies;

            if (availableCopies < 1) {
                throw new Error('No available copies of this book');
            }

            // check out the book
            const query = 'INSERT INTO checkouts (user_id, book_id, checkout_date, due_date, returned) VALUES ($1, $2, $3, $4, $5) RETURNING *';

            const values = [checkout.user_id, checkout.book_id, checkout.checkout_date, checkout.due_date, checkout.returned];

            const result = await this.client.query(query, values);
            await this.client.query('COMMIT');

            return result.rows[0];

        } catch (error: any) {
            await this.client.query('ROLLBACK');
            throw error;
        }
    }

    public async retrieveCheckout(checkoutId: string): Promise<Checkout> {
        const query = 'SELECT * FROM checkouts WHERE id = $1';
        const values = [checkoutId];

        try {
            const result: QueryResult<Checkout> = await this.pool.query(query, values);
            const checkout = result.rows[0];
            if (!checkout) {
                throw new Error('Checkout not found.');
            }
            return checkout;
        } catch (error: any) {
            throw new Error(`Error retrieving checkout: ${error.message}`);
        }
    }

    public async updateCheckout(checkout: Checkout): Promise<void> {
        const query =
            'UPDATE checkouts SET user_id = $1, book_id = $2, checkout_date = $3, due_date = $4, returned = $5 WHERE id = $6';
        const values = [checkout.user_id, checkout.book_id, checkout.checkout_date, checkout.due_date, checkout.returned, checkout.id];
        try {
            console.log('Updating checkout:', checkout);
            const result = await this.pool.query(query, values);
            if (result.rowCount !== 1) {
                throw new Error('Failed to update checkout');
            }
        } catch (error: any) {
            throw new Error(`Error updating checkout: ${error.message}`);
        }
    }

    public async retrieveCheckouts(): Promise<Checkout[]> {
        const query = 'SELECT * FROM checkouts';
        try {
            const result: QueryResult<Checkout> = await this.pool.query(query);
            const checkouts = result.rows;
            return checkouts;
        } catch (error: any) {
            throw new Error(`Error retrieving checkouts: ${error.message}`);
        }
    }

    public async retrieveDueCheckouts(): Promise<Checkout[]> {
        //    due in 3 days
        const query = 'SELECT * FROM checkouts WHERE due_date < NOW() + INTERVAL \'3 days\'';
        try {
            const result: QueryResult<Checkout> = await this.pool.query(query);
            const checkouts = result.rows;
            return checkouts;
        } catch (error: any) {
            throw new Error(`Error retrieving due checkouts: ${error.message}`);
        }
    }

    public async retrieveCheckoutsByUser(userId: string): Promise<Checkout[]> {
        const query = 'SELECT * FROM checkouts WHERE user_id = $1';
        const values = [userId];
        try {
            const result: QueryResult<Checkout> = await this.pool.query(query, values);
            const checkouts = result.rows;
            return checkouts;
        } catch (error: any) {
            throw new Error(`Error retrieving checkouts by user: ${error.message}`);
        }
    }
}
