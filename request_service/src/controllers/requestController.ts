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

  static async approveRequest(req: Request, res: Response): Promise<void> {
    try {
      const requestId = parseInt(req.params.requestId, 10);
      if (isNaN(requestId) || requestId <= 0) {
        res.status(400).json({ error: 'Invalid request ID' });
        return;
      }

      const result = await RequestService.updateRequestState(requestId, 'approved');
      res.status(200).json({ message: 'Request approved', request: result });
    } catch (error) {
      console.error('Error in approveRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async rejectRequest(req: Request, res: Response): Promise<void> {
    try {
      const requestId = parseInt(req.params.requestId, 10);
      if (isNaN(requestId) || requestId <= 0) {
        res.status(400).json({ error: 'Invalid request ID' });
        return;
      }

      const result = await RequestService.updateRequestState(requestId, 'rejected');
      res.status(200).json({ message: 'Request rejected', request: result });
    } catch (error) {
      console.error('Error in rejectRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Add other controller methods as needed
}

export default RequestController;

