// src/routes/userRoutes.ts
import express from 'express';
import UserManager from '../services/UserManager';
import authMiddleware from '../middleware/AuthMiddleware';
const router = express.Router();

const userManager = new UserManager();
// Public route: Authentication (Login)
router.post('/authenticate', userManager.authenticateUser);

// Authorized routes
router.post('/register', authMiddleware(['librarian']), userManager.registerUser); // Accessible only to librarians
router.put('/manage/:userId', authMiddleware(), userManager.manageProfile); // Accessible to authorized users
router.get('/:userId', authMiddleware(['librarian']), userManager.getUserById); // Accessible to authorized users
router.put('/update/:userId', authMiddleware(['librarian']), userManager.updateUser); // Accessible to librarian only
router.post('/expire-logins', authMiddleware(), userManager.expireOldLogins); // Accessible to authorized users
router.post('/logout/:userId', authMiddleware(), userManager.logout); // Accessible to authorized users
router.put('/change-password/:userId', authMiddleware(), userManager.changePassword); // Accessible to authorized users

router.post('/authenticate-by-role', userManager.authenticateUserByRole);
export default router;
