import { Request, Response } from 'express';
import LibrarianService from '../services/LibrarianService';
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware';

class LibrarianController {
    private librarianService: LibrarianService;

    constructor() {
        this.librarianService = new LibrarianService();
    }

    addNewBooks = async (req: Request, res: Response): Promise<void> => {
        const bookDetails = req.body;

        try {
            const result = await this.librarianService.addNewBooks(bookDetails);
            if (result) {
                res.status(200).json({ success: true, message: 'Books added successfully' });
            } else {
                res.status(500).json({ success: false, message: 'Failed to add books' });
            }
        } catch (error) {
            res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
    };

    registerNewUsers = async (req: Request, res: Response): Promise<void> => {
        const userDetails = req.body;

        try {
            const result = await this.librarianService.registerNewUsers(userDetails);
            if (result) {
                res.status(200).json({ success: true, message: 'Users registered successfully' });
            } else {
                res.status(500).json({ success: false, message: 'Failed to register users' });
            }

        } catch (error) {
            res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
    };
}

export default LibrarianController;
