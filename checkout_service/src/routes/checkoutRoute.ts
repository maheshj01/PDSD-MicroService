// routes/checkoutRoutes.ts

import express from 'express';
import CheckoutController from '../controllers/checkoutController';
import CheckoutService from '../services/checkoutService';

const checkoutRoutes = express.Router();
const app = express();

checkoutRoutes.get('/checkouts', CheckoutController.getAllCheckouts);
checkoutRoutes.get('/checkouts/:id', CheckoutController.getCheckoutById);
checkoutRoutes.post('/checkouts/checkout', CheckoutController.checkoutBook);
checkoutRoutes.post('/checkouts/:bookId/hold', CheckoutController.placeHoldOnBook);
checkoutRoutes.post('/checkouts/:id/renew', CheckoutController.renewCheckoutItem);
export default checkoutRoutes;
