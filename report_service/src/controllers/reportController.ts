// src/controllers/ReportController.ts

import { Request, Response } from 'express';
import axios from 'axios';
import ReportService from '../services/reportService';

class ReportController {
    static async generateMostBorrowedBooksReport(req: Request, res: Response): Promise<void> {
        try {
            const token = req.header('Authorization')?.split(' ')[1];
            const mostBorrowedBooksData = await ReportService.getMostBorrowedBooksData(token!);

            // Generate the report using the data
            // ...

            // Return the report in a downloadable format
            res.status(200).json({
                message: 'Most Borrowed Books Report Generated',
                data: mostBorrowedBooksData
            });
        } catch (error: any) {
            console.error(error);
            res.status(error.response?.status || 500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    static async generateOverdueItemsReport(req: Request, res: Response): Promise<void> {
        try {
            const token = req.header('Authorization')?.split(' ')[1];
            const overdueItemsData = await ReportService.getOverdueItemsData(token!);

            // Generate the report using the data
            // ...

            // Return the report in a downloadable format
            res.status(200).json({
                message: 'Overdue Items Report Generated',
                data: overdueItemsData
            });
        } catch (error: any) {
            console.error(error);
            res.status(error.response?.status || 500).json({ error: error.message || 'Internal Server Error' });
        }
    }

    // Add other report generation methods as needed
}

export default ReportController;
