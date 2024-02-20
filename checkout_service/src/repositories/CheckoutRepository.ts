// src/repositories/CheckoutRepositoryDB.ts

import { Pool, QueryResult } from 'pg';
import axios from 'axios';
import { Checkout } from '../models/Checkout';
import dotenv from 'dotenv';

dotenv.config();

export class CheckoutRepositoryDB {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || '5432', 10),
        });

        this.connect(); // Connect to the database when the class is instantiated
    }

    private connect(): void {
        this.pool.connect()
            .then(() => console.log('Checkout Service Connected to the database'))
            .catch((err) => console.error('Error connecting to the database:', err.message));
    }

    public async disconnect(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Disconnected from the database');
        } catch (err: any) {
            console.error('Error disconnecting from the database:', err.message);
        }
    }

    public async storeCheckout(checkout: Checkout): Promise<Checkout> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            // Make a request to the Book Service API to get available copies
            const bookServiceUrl = process.env.BOOKS_SERVICE_BASE_URL; // Provide the correct base URL
            const bookInfoResponse = await axios.get(`${bookServiceUrl}/api/books/${checkout.bookId}`);
            const availableCopies = bookInfoResponse.data.availableCopies;
            if (!availableCopies || availableCopies <= 0) {
                throw new Error('Book is not available for checkout');
            }
            // Insert checkout record
            const checkoutQueryResult: QueryResult<Checkout> = await client.query(
                'INSERT INTO checkouts (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
                [checkout.userId, checkout.bookId, checkout.dueDate]
            );

            const checkoutResult = checkoutQueryResult.rows[0];

            await client.query('COMMIT');

            return checkout;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    public async retrieveCheckout(bookId: string): Promise<Checkout> {
        const query = 'SELECT * FROM checkouts WHERE book_id = $1';
        const values = [bookId];

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
        const values = [checkout.userId, checkout.bookId, checkout.checkoutDate, checkout.dueDate, checkout.returned, checkout.checkoutId];

        try {
            await this.pool.query(query, values);
        } catch (error: any) {
            throw new Error(`Error updating checkout: ${error.message}`);
        }
    }
}
