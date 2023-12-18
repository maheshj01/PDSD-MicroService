// requestRoutes.ts
import express from 'express';
import RequestController from '../controllers/requestController';
import { roleMiddleware } from '../middleware/roleMiddleware';

const requestRoutes = express.Router();

requestRoutes.post('/submit', roleMiddleware(['staff', 'admin']), RequestController.submitRequest);
requestRoutes.get('/get', roleMiddleware(['admin', 'staff']), RequestController.getRequests);
requestRoutes.post('/update/:requestId/approve', roleMiddleware(['admin']), RequestController.approveRequest);
requestRoutes.post('/update/:requestId/reject', roleMiddleware(['admin']), RequestController.rejectRequest);

// Add other routes as needed

export default requestRoutes;
