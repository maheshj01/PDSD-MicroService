// routes/checkoutRoutes.ts

import express from 'express';
import CheckoutController from '../controllers/checkoutController';
import { CheckoutService } from '../services/checkoutService';

const checkoutRoutes = express.Router();
const app = express();
const checkoutService = new CheckoutService();
const checkoutController = new CheckoutController(checkoutService);

checkoutRoutes.get('/checkouts', checkoutController.getAllCheckouts);
checkoutRoutes.get('/checkouts/:id', checkoutController.getCheckoutById);
checkoutRoutes.post('/checkouts', checkoutController.addNewCheckout);

export default checkoutRoutes;
