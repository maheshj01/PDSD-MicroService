// src/controllers/requestController.ts
import { Request, Response } from 'express';
import RequestRepository from '../repositories/RequestRepository';
import LibrarianApprovalService from './LibrarianApprovalService';

class RequestManager {

  async submitRequest(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, book_title, book_author, justification } = req.body;

      // Validate inputs
      if (!user_id || typeof user_id !== 'number' || user_id <= 0 || !book_title || !book_author || !justification) {
        res.status(400).json({ error: 'Invalid input data' });
        return;
      }

      const result = await RequestRepository.storeRequest(user_id, book_title, book_author, justification);
      res.status(201).json({ message: 'Request submitted for review', request: result });
    } catch (error) {
      console.error('Error in submitRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getRequests(req: Request, res: Response): Promise<void> {
    try {
      const result = await RequestRepository.getRequestHistory();
      res.status(200).json({ requests: result });
    } catch (error) {
      console.error('Error in getRequests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateRequest(req: Request, res: Response): Promise<void> {
    try {
      const requestId = parseInt(req.params.requestId, 10);
      const newState = req.body.state;
      if (isNaN(requestId) || requestId <= 0) {
        res.status(400).json({ error: 'Invalid request ID' });
        return;
      }

      const result = await LibrarianApprovalService.updateBookRequest(requestId, newState);
      res.status(200).json({ message: 'Request approved', request: result });
    } catch (error) {
      console.error('Error in approveRequest:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Add other controller methods as needed
}

export default RequestManager;

