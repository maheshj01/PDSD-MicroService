// CheckoutService.js

import config from "../config";
import { useAuth } from "../context/AuthContext";

class CheckoutService {
    private checkoutBaseUrl: string;
    private token: string | null;

    constructor(token: string) {
        this.checkoutBaseUrl = config.checkoutServiceBaseUrl;
        this.token = token;
    }

    async checkoutItems(items: any) {
        try {
            const response = await fetch(this.checkoutBaseUrl + '/api/checkout/checkout-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${this.token}`,
                    // Add any additional headers here, such as authorization token
                },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) {
                throw new Error('Failed to checkout items');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default CheckoutService;
