// src/routes/reportRoutes.ts

import express from 'express';
import ReportController from '../controllers/reportController';
import { verifyToken } from '../middleware/AuthMiddleware';
import { roleMiddleware } from '../middleware/Rolemiddleware';

const reportRoutes = express.Router();

// Apply middleware to validate user token
reportRoutes.use(verifyToken);

// Apply role-based middleware to allow only librarians and admins
reportRoutes.use(roleMiddleware(['librarian', 'admin']));

// Routes
reportRoutes.get('/generate/most-borrowed-books', ReportController.generateMostBorrowedBooksReport);
reportRoutes.get('/generate/overdue-items', ReportController.generateOverdueItemsReport);

// Add other routes as needed

export default reportRoutes;
