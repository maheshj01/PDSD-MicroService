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
checkoutRoutes.post('/checkouts/:checkoutId/renew', CheckoutController.renewCheckoutItem);
checkoutRoutes.post('/checkouts/:checkoutId/return', CheckoutController.returnCheckoutItem);
export default checkoutRoutes;
