// routes/checkoutRoutes.ts

import express from 'express';
import CheckoutController from '../controllers/checkoutController';
import { verifyToken } from '../middleware/authMiddleware';

const checkoutRoutes = express.Router();

checkoutRoutes.use('/checkouts', verifyToken); // Apply the middleware to all routes starting with /checkouts

checkoutRoutes.get('/checkouts', CheckoutController.getAllCheckouts);
checkoutRoutes.get('/checkouts/user/:userId', CheckoutController.getUserCheckouts);
checkoutRoutes.get('/checkouts/:bookId/hold', CheckoutController.getBookHolds);
checkoutRoutes.get('/checkouts/hold', CheckoutController.getAllHolds);
checkoutRoutes.get('/checkouts/:id', CheckoutController.getCheckoutById);
checkoutRoutes.post('/checkouts/checkout', CheckoutController.checkoutBook);
checkoutRoutes.post('/checkouts/:bookId/hold', CheckoutController.placeHoldOnBook);
checkoutRoutes.post('/checkouts/:checkoutId/renew', CheckoutController.renewCheckoutItem);
checkoutRoutes.post('/checkouts/:checkoutId/return', CheckoutController.returnCheckoutItem);

// Route for Report Service
checkoutRoutes.get('/checkouts/reports/most-borrowed-books', CheckoutController.getMostBorrowedBooks);
checkoutRoutes.get('/checkouts/reports/overdue-items', CheckoutController.getOverdueItems);

export default checkoutRoutes;
