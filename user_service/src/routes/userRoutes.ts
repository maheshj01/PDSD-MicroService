// src/routes/userRoutes.ts
import express from 'express';
import UserManager from '../services/UserManager';
import authMiddleware from '../middleware/AuthMiddleware';
const router = express.Router();
// Public route: Authentication (Login)
router.post('/authenticate', UserManager.authenticateUser);

// Authorized routes
router.post('/register', authMiddleware(['librarian']), UserManager.registerUser); // Accessible only to librarians
router.put('/manage/:userId', authMiddleware(), UserManager.manageProfile); // Accessible to authorized users
router.get('/:userId', authMiddleware(['librarian']), UserManager.getUserById); // Accessible to authorized users
router.put('/update/:userId', authMiddleware(['librarian']), UserManager.updateUser); // Accessible to librarian only
// router.post('/expire-logins', authMiddleware(), UserManager.expireOldLogins); // Accessible to authorized users
router.post('/logout/:userId', authMiddleware(), UserManager.logout); // Accessible to authorized users
router.put('/change-password/:userId', authMiddleware(), UserManager.changePassword); // Accessible to authorized users

export default router;
