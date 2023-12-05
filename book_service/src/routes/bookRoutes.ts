// src/routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/bookController';

const router = express.Router();

router.get('/books', BookController.searchBooks);
router.get('/books/:id', BookController.viewBookDetails);
router.post('/books/:id/hold', BookController.placeHoldOnBook);
// Add more routes as needed

export default router;