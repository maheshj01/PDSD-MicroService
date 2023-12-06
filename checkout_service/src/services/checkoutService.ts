// services/checkoutService.ts

import pool from '../db';
import { Checkout } from '../models/checkout';
import axios from 'axios';

class CheckoutService {

  static async checkoutBook(user_id: number, book_id: number, due_date: Date): Promise<Checkout> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Make a request to the Book Service API to get available copies
      const bookServiceUrl = process.env.BOOKS_SERVICE_BASE_URL; // Provide the correct base URL
      const bookInfoResponse = await axios.get(`${bookServiceUrl}/api/books/${book_id}`);
      const availableCopies = bookInfoResponse.data.availableCopies;
      console.log("availableCopies:", availableCopies, "response:", bookInfoResponse.data);
      if (!availableCopies || availableCopies <= 0) {
        throw new Error('Book is not available for checkout');
      }
      console.log('availableCopies:', availableCopies);

      // Update book availability
      const bookUpdateResponse =
        await axios.put(`${bookServiceUrl}/api/books/${book_id}`,
        );

      // Insert checkout record
      const checkoutResult = await client.query(
        'INSERT INTO checkouts (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
        [user_id, book_id, due_date]
      );

      const checkout = checkoutResult.rows[0];

      await client.query('COMMIT');

      return checkout;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getAllCheckouts(): Promise<Checkout[]> {
    const result = await pool.query('SELECT * FROM checkouts');
    return result.rows;
  }

  static async getCheckoutById(id: number): Promise<Checkout | null> {
    const result = await pool.query('SELECT * FROM checkouts WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  // Updated to use safe string handling
  static async addNewCheckout(user_id: number, book_id: number, due_date: Date): Promise<Checkout> {
    // Basic input validation
    if (!user_id || !book_id || !due_date) {
      throw new Error('Invalid input parameters');
    }

    // Using parameterized queries to prevent SQL injection
    const result = await pool.query(
      'INSERT INTO checkouts (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, book_id, due_date]
    );

    // Ensure the result.rows[0] is not null before returning
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('Failed to add new checkout');
    }
  }

  // New method to place a hold on a checked-out item
  static async placeHoldOnCheckout(checkoutId: number): Promise<void> {
    const result = await pool.query(
      'INSERT INTO checkout_holds (checkout_id) VALUES ($1) RETURNING *',
      [checkoutId]
    );

    if (result.rows.length === 0) {
      throw new Error('Failed to place a hold on the checkout item');
    }

    // Communicate with BookService to update copies on hold
    try {
      const bookServiceBaseUrl = process.env.BOOKS_SERVICE_BASE_URL;
      const bookServiceEndpoint = `/api/books/updateCopiesOnHold/${checkoutId}`;
      const bookServiceUrl = `${bookServiceBaseUrl}${bookServiceEndpoint}`;

      await axios.post(bookServiceUrl);
    } catch (error) {
      console.error('Error communicating with BookService:', error);
      // Handle the error as needed
    }
  }

  // New method to renew a checked-out item
  static async renewCheckoutItem(checkoutId: number, newDueDate: Date): Promise<void> {
    const result = await pool.query(
      'UPDATE checkouts SET due_date = $1 WHERE id = $2 RETURNING *',
      [newDueDate, checkoutId]
    );

    if (result.rows.length === 0) {
      throw new Error('Failed to renew the checkout item');
    }
  }
}

export default CheckoutService;