// controllers/checkoutController.ts

import { Request, Response } from 'express';
import pool from '../db';
import { Checkout } from '../models/checkout';

class CheckoutController {
  public async getAllCheckouts(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query('SELECT * FROM checkouts');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getCheckoutById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM checkouts WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Checkout not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async addNewCheckout(req: Request, res: Response): Promise<void> {
    const { user_id, book_id, due_date } = req.body as Checkout;
    try {
      const result = await pool.query(
        'INSERT INTO checkouts (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
        [user_id, book_id, due_date]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CheckoutController();
