// controllers/checkoutController.ts

import { Request, Response } from 'express';
import { CheckoutService } from '../services/checkoutService';

class CheckoutController {
    private checkoutService: CheckoutService;

    constructor(checkoutService: CheckoutService) {
        this.checkoutService = checkoutService;
    }

    public async getAllCheckouts(req: Request, res: Response): Promise<void> {
        try {
            const checkouts = await this.checkoutService.getAllCheckouts();
            res.json(checkouts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getCheckoutById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            res.status(400).json({ error: 'Invalid checkout ID' });
        }

        try {
            const checkout = await this.checkoutService.getCheckoutById(Number(id));

            if (!checkout) {
                res.status(404).json({ error: 'Checkout not found' });
            }

            res.json(checkout);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async addNewCheckout(req: Request, res: Response): Promise<void> {
        const { user_id, book_id, due_date } = req.body;

        if (!Number.isInteger(Number(user_id)) || !Number.isInteger(Number(book_id))) {
            res.status(400).json({ error: 'Invalid user_id or book_id' });
        }

        try {
            const newCheckout = await this.checkoutService.addNewCheckout(user_id, book_id, due_date);
            res.status(201).json(newCheckout);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default CheckoutController;
