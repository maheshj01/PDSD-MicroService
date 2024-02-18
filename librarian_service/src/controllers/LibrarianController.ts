// src/controllers/LibrarianController.ts
import { Request, Response } from 'express';
import LibrarianManager from '../services/LibrarianManager';
import UserDetails from '../models/UserDetails';
import BookDetails from '../models/BookDetails';

class LibrarianController {
    private librarianManager: LibrarianManager;

    constructor() {
        this.librarianManager = new LibrarianManager();
    }

    async addNewBooks(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(400).json({ error: 'Token is required' });
            return;
        }

        const bookDetails = req.body as BookDetails;

        // Check librarian privilege before proceeding
        const hasPrivilege = await this.librarianManager.checkLibrarianPrivileges(token);
        if (!hasPrivilege) {
            res.status(403).json({ error: 'User does not have the required role' });
            return;
        }

        try {
            const response = await this.librarianManager.addNewBooks(token, bookDetails);

            if (response.status === 201) {
                res.status(200).json({ success: true, message: 'Books added successfully' });
            } else {
                res.status(response.status).json({ success: false, message: response.data });
            }
        } catch (error: any) {
            res.status(error.response?.status || 500).json(error.response?.data ?? { error: error.message || 'Internal Server Error' });
        }
    }

    async registerNewUsers(req: Request, res: Response): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(400).json({ error: 'Token is required' });
            return;
        }

        const userDetails = req.body as UserDetails;

        // Check librarian privilege before proceeding
        const hasPrivilege = await this.librarianManager.checkLibrarianPrivileges(token);
        if (!hasPrivilege) {
            res.status(403).json({ error: 'User does not have the required role' });
            return;
        }

        try {
            const response = await this.librarianManager.registerNewUsers(token, userDetails);
            if (response.status === 201) {
                res.status(200).json({ success: true, message: 'Users registered successfully' });
            } else {
                res.status(response.status).json({ success: false, message: response.data });
            }
        } catch (error: any) {
            res.status(error.response?.status || 500).json(error.response?.data ?? { error: error.message || 'Internal Server Error' });
        }
    }
}
export default LibrarianController;
