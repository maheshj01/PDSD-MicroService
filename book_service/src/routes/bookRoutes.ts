// src/routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/bookController';

const router = express.Router();

router.get('/books', BookController.searchBooks);
router.get('/books/:bookId', BookController.viewBookDetails);
router.post('/books/:bookId/hold', BookController.placeHoldOnBook);
router.put('/books/:bookId', BookController.updateCopiesOnCheckout);
router.put('/books/:bookId/hold', BookController.updateCopiesOnHold);
router.put('/books/:bookId/return', BookController.updateCopiesOnReturn);
// Add more routes as needed

// Routes handled by LibrarianService
router.post('/librarian/books', BookController.addBook);
router.put('/librarian/books/:id', BookController.updateBook);
// // Place hold on book route
// router.post('/books/hold/:id', BookController.placeHoldOnBook);

// Update copies on hold route (this is the route BookService will expose for CheckoutService to call)
// router.put('/books/hold/:bookId', BookController.updateCopiesOnHold);

export default router;