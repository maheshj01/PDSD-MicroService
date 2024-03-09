// src/app.ts

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { CheckoutManager } from './services/checkoutManager';
import dotenv from 'dotenv';
import { NotificationService, NotificationType } from './services/NotificationService';

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;
const notificationService = new NotificationService();

// Middleware to parse JSON requests
app.use(bodyParser.json());
const checkoutManager = new CheckoutManager();
app.post('/api/checkout/renew-items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = req.body.items; // Assuming request body contains an array of items
    await checkoutManager.renewItems(item);
    const userId = item.user_id;
    const token = (req.headers.authorization as string).split(' ')[1];
    await notificationService.sendNotification(token, userId, item.bookId, item.due_date, NotificationType.RENEWAL);
    res.status(200).json({ message: 'Items renewed successfully' });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/checkout/return-item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, userId } = req.body;
    const returned = await checkoutManager.returnItem(bookId, userId);
    if (returned) {
      const token = (req.headers.authorization as string).split(' ')[1];
      await notificationService.sendNotification(token, userId, bookId, null, NotificationType.RETURN);
      res.status(200).json({ message: 'Item returned successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/checkout/checkout-item', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId, userId, due_date } = req.body;
    const checkedOut = await checkoutManager.checkoutItem(bookId, userId, due_date);
    if (checkedOut) {
      const token = (req.headers.authorization as string).split(' ')[1];
      const success = await notificationService.sendNotification(token, userId, bookId, checkedOut.due_date, NotificationType.CHECKOUT);
    }
    res.status(200).json({ message: 'Item checked out successfully', data: checkedOut });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/checkout/checkouts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all checkouts
    const checkouts = await checkoutManager.checkouts();
    res.status(200).json({ data: checkouts });
  } catch (error: any) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/checkout/due-checkouts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all due checkouts
    const dueCheckouts = await checkoutManager.dueCheckouts();
    res.status(200).json({ data: dueCheckouts });
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
