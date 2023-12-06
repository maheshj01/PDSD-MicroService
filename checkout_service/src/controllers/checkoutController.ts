// controllers/checkoutController.ts

import { Request, Response } from 'express';
import CheckoutService from '../services/checkoutService';
import axios from 'axios';

class CheckoutController {

  static async checkoutBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId, dueDate } = req.body;

      // Validate and sanitize inputs
      // ... your validation logic ...
      const base_url = process.env.USER_SERVICE_BASE_URL;
      const tokenFromHeader = req.header('Authorization')?.split(' ')[1];

      // Make a request to the user_service to verify the token
      const tokenVerificationResponse = await axios.post(
        `${base_url}/api/auth/verify-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenFromHeader}`,
          },
        }
      );

      if (tokenVerificationResponse.status !== 200) {
        res.status(401).json({ error: 'Token verification failed' });
        return;
      }

      // If the token is valid, proceed with the checkout logic
      // Call the corresponding methods from CheckoutService
      const checkoutResult = await CheckoutService.checkoutBook(userId, bookId, dueDate);

      // Return the result
      res.json(checkoutResult);
    } catch (error: any) {
      console.error('Error in checkoutBook:', error.message);
      res.status(error.response?.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
  }


  static async getAllCheckouts(req: Request, res: Response): Promise<void> {
    try {
      const checkouts = await CheckoutService.getAllCheckouts();
      res.json(checkouts);
    } catch (error) {
      console.error('Error in getAllCheckouts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCheckoutById(req: Request, res: Response): Promise<void> {
    try {
      const checkoutId = parseInt(req.params.id, 10);
      if (isNaN(checkoutId) || checkoutId <= 0) {
        res.status(400).json({ error: 'Invalid checkout ID' });
        return;
      }

      const checkout = await CheckoutService.getCheckoutById(checkoutId);
      if (checkout) {
        res.json(checkout);
      } else {
        res.status(404).json({ error: 'Checkout not found' });
      }
    } catch (error) {
      console.error('Error in getCheckoutById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public static async placeHoldOnBook(req: Request, res: Response): Promise<void> {
    try {
      const { userId, bookId } = req.body;

      // Validate and sanitize inputs
      if (!userId || typeof userId !== 'number' || userId <= 0) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      if (!bookId || typeof bookId !== 'number' || bookId <= 0) {
        res.status(400).json({ error: 'Invalid book ID' });
        return;
      }

      const userVerifyTokenUrl = `${process.env.USER_SERVICE_BASE_URL}/api/auth/verify-token`;
      const token = req.header('Authorization')?.split(' ')[1];
      const tokenVerificationResponse = await axios.post(userVerifyTokenUrl, {}, { headers: { Authorization: `Bearer ${token}` } });

      if (tokenVerificationResponse.status !== 200) {
        res.status(401).json({ error: 'Token verification failed' });
        return;
      }

      // Call the corresponding methods from CheckoutService
      await CheckoutService.placeHoldOnBook(userId, bookId);

      // Return success
      res.json({ message: 'Hold placed successfully' });
    } catch (error) {
      console.error('Error in placeHoldOnBook:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async renewCheckoutItem(req: Request, res: Response): Promise<void> {
    try {
      const checkoutId = parseInt(req.params.id, 10);
      if (isNaN(checkoutId) || checkoutId <= 0) {
        res.status(400).json({ error: 'Invalid checkout ID' });
        return;
      }

      const newDueDate = new Date(req.body.newDueDate);
      if (isNaN(newDueDate.getTime())) {
        res.status(400).json({ error: 'Invalid new due date' });
        return;
      }

      await CheckoutService.renewCheckoutItem(checkoutId, newDueDate);
      res.json({ message: 'Checkout item renewed successfully' });
    } catch (error) {
      console.error('Error in renewCheckoutItem:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default CheckoutController;
