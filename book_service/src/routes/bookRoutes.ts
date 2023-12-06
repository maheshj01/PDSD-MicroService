// src/routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/bookController';

const router = express.Router();

router.get('/books', BookController.searchBooks);
router.get('/books/:id', BookController.viewBookDetails);
router.post('/books/:id/hold', BookController.placeHoldOnBook);
router.put('/books/:bookId', BookController.updateCopiesOnCheckout);
// Add more routes as needed

// // Place hold on book route
// router.post('/books/hold/:id', BookController.placeHoldOnBook);

// Update copies on hold route (this is the route BookService will expose for CheckoutService to call)
// router.put('/books/hold/:bookId', BookController.updateCopiesOnHold);

export default router;