// src/services/ReportService.ts

import axios from 'axios';

class ReportService {
    static async getMostBorrowedBooksData(token: string): Promise<any> {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${process.env.CHECKOUT_SERVICE_BASE_URL}/api/checkouts/reports/most-borrowed-books`,
                { headers }
            );
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw new Error('Error fetching most borrowed books data');
        }
    }

    static async getOverdueItemsData(token: string): Promise<any> {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${process.env.CHECKOUT_SERVICE_BASE_URL}/api/checkouts/reports/overdue-items`,
                { headers }
            );
            return response.data;
        } catch (error: any) {
            console.error(error);
            throw new Error('Error fetching overdue items data');
        }
    }

}

export default ReportService;
