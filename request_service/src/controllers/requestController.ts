// src/controllers/requestController.ts
import { Request, Response } from 'express';
import RequestService from '../services/requestService';

class RequestController {
  static async submitRequest(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, book_title, book_author, justification } = req.body;

      // Validate inputs
      if (!user_id || typeof user_id !== 'number' || user_id <= 0 || !book_title || !book_author || !justification) {
        res.status(400).json({ error: 'Invalid input data' });
        return;
      }

      const result = await RequestService.submitRequest(user_id, book_title, book_author, justification);
      res.status(201).json({ message: 'Request submitted for review', request: result });
    } catch (error) {
      console.error('Error in submitRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getRequests(req: Request, res: Response): Promise<void> {
    try {
      const result = await RequestService.getRequests();
      res.status(200).json({ requests: result });
    } catch (error) {
      console.error('Error in getRequests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Add other controller methods as needed
}

export default RequestController;

