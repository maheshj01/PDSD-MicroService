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
  public static async placeHoldOnBook(user_id: number, book_id: number): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Check if a hold already exists for the book and user
      const existingHoldResult = await client.query(
        'SELECT id FROM checkout_holds WHERE book_id = $1 AND user_id = $2',
        [book_id, user_id]
      );

      if (existingHoldResult.rows.length > 0) {
        // Hold already exists, handle this case based on your application logic
        throw new Error('Hold already exists for this book and user');
      }

      // Place a new hold
      await client.query(
        'INSERT INTO checkout_holds (user_id, book_id) VALUES ($1, $2)',
        [user_id, book_id]
      );

      // Additional logic...
      const result = await client.query('COMMIT');

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  public static async returnCheckoutItem(checkoutId: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Check if the checkout exists and has not been returned
      const checkoutResult = await client.query('SELECT * FROM checkouts WHERE id = $1 AND returned = false', [checkoutId]);
      const checkout = checkoutResult.rows[0];
      if (!checkout) {
        throw new Error('Checkout not found or already returned');
      }
      // Update the checkout as returned
      await client.query('UPDATE checkouts SET returned = true WHERE id = $1', [checkoutId]);
      console.log('checkout return success for:', checkoutId, " bookid:", checkout.book_id);
      // Make an API call to update copies in books_service
      const booksServiceBaseUrl = process.env.BOOKS_SERVICE_BASE_URL;
      const returnBookApiUrl = `${booksServiceBaseUrl}/api/books/${checkout.book_id}/return`;
      console.log('returnBookApiUrl:', returnBookApiUrl);

      const resp = await axios.put(returnBookApiUrl, { 'action': 'add' });

      // Log the response
      console.log('Response from Books Service:', resp.data);

      if (resp.status === 200) {
        await client.query('COMMIT');
        return true;
      } else {
        throw new Error('Failed to update copies in Books Service');
      }

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error in returnCheckoutItem:', error);
      return false;
    } finally {
      client.release();
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

  static async getUserCheckouts(userId: number): Promise<Checkout[]> {
    try {
      const result = await pool.query('SELECT * FROM checkouts WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error in getUserCheckouts:', error);
      throw new Error('Failed to fetch user checkouts');
    }
  }

  static async getBookHolds(bookId: number): Promise<Checkout[]> {
    try {
      const result = await pool.query('SELECT * FROM checkout_holds WHERE book_id = $1', [bookId]);
      return result.rows;
    } catch (error) {
      console.error('Error in getBookHolds:', error);
      throw new Error('Failed to fetch book holds');
    }
  }
  static async getAllHolds(): Promise<Checkout[]> {
    try {
      const result = await pool.query('SELECT * FROM checkout_holds');
      return result.rows;
    } catch (error) {
      console.error('Error in getAllHolds:', error);
      throw new Error('Failed to fetch book holds');
    }
  }
}
export default CheckoutService;