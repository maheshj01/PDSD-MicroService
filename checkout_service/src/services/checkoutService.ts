// services/checkoutService.ts

import pool from '../db';
import { Checkout } from '../models/checkout';

export class CheckoutService {
  public async getAllCheckouts(): Promise<Checkout[]> {
    const result = await pool.query('SELECT * FROM checkouts');
    return result.rows;
  }

  public async getCheckoutById(id: number): Promise<Checkout | null> {
    const result = await pool.query('SELECT * FROM checkouts WHERE id = $1', [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  public async addNewCheckout(user_id: number, book_id: number, due_date: Date): Promise<Checkout> {
    const result = await pool.query(
      'INSERT INTO checkouts (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
      [user_id, book_id, due_date]
    );
    return result.rows[0];
  }
}
