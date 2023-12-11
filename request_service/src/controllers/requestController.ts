// src/controllers/requestController.ts
import { Request, Response } from 'express';
import RequestService from '../services/requestService';

class RequestController {
  static async submitRequest(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, book_title, book_author, justification } = req.body;
      const result = await RequestService.submitRequest(user_id, book_title, book_author, justification);
      res.status(201).json({ message: 'Request submitted for review', request: result });
    } catch (error) {
      console.error('Error in submitRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add other controller methods as needed
}

export default RequestController;
