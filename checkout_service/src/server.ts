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

app.post('/api/checkout/renew-items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemsToRenew = req.body.items; // Assuming request body contains an array of items
    await checkoutManager.renewItems(itemsToRenew);
    res.status(200).json({ message: 'Items renewed successfully' });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/checkout/checkout-item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, userId, due_date } = req.body;
    const checkedOut = await checkoutManager.checkoutItem(bookId, userId, due_date);
    res.status(200).json({ message: 'Item checked out successfully', data: checkedOut });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
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
