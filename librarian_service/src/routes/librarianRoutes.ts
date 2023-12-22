// src/routes/librarianRoutes.ts

import express from 'express';
import LibrarianController from '../controllers/LibrarianController';
import { verifyToken } from '../middleware/AuthMiddleware';
import { roleMiddleware } from '../middleware/Rolemiddleware';
import LibrarianUserController from '../controllers/LibrarianUserController';

const librarianRoutes = express.Router();

// Apply middleware to validate user token
librarianRoutes.use(verifyToken);

// Apply role-based middleware to allow only librarians and admins
librarianRoutes.use(roleMiddleware(['librarian', 'admin']));

// Routes
librarianRoutes.post('/books/add', LibrarianController.addBook);
librarianRoutes.put('/books/:bookId/update', LibrarianController.updateBook);

// Add other routes as needed

// Routes for user operations
librarianRoutes.post('/users/register', LibrarianUserController.registerUser);
librarianRoutes.put('/users/:userId/edit', LibrarianUserController.editUser);

export default librarianRoutes;
