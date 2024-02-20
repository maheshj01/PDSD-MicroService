// src/app.ts

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { CheckoutManager } from './services/checkoutManager';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse JSON requests
app.use(bodyParser.json());
const checkoutManager = new CheckoutManager();

app.post('/api/checkout/renew-items', (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemsToRenew = req.body.items; // Assuming request body contains an array of items
    checkoutManager.renewItems(itemsToRenew);
  } catch (error) {
    next(error);
  }
});

app.post('/api/checkout/checkout-item', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, userId, due_date } = req.body;
    checkoutManager.checkoutItem(bookId, userId, due_date);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Checkout Service is running on http://localhost:${port}`);
});
