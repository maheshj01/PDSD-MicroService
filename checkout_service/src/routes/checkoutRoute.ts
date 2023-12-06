// routes/checkoutRoutes.ts

import express from 'express';
import CheckoutController from '../controllers/checkoutController';
import { CheckoutService } from '../services/checkoutService';

const router = express.Router();
const app = express();
const checkoutService = new CheckoutService();
const checkoutController = new CheckoutController(checkoutService);

router.get('/checkouts', checkoutController.getAllCheckouts);
router.get('/checkouts/:id', checkoutController.getCheckoutById);
router.post('/checkouts', checkoutController.addNewCheckout);

export default router;
