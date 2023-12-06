// routes/checkoutRoutes.ts

import { Router } from 'express';
import checkoutController from '../controllers/checkoutController';

const checkoutRouter: Router = Router();

checkoutRouter.get('/checkouts', checkoutController.getAllCheckouts);
checkoutRouter.get('/checkouts/:id', checkoutController.getCheckoutById);
checkoutRouter.post('/checkouts', checkoutController.addNewCheckout);

export default checkoutRouter;
