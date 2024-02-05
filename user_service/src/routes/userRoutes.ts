// src/routes/userRoutes.ts
import express from 'express';
import UserManager from '../services/UserManager';
import { authMiddleware } from '../middleware/AuthMiddleware';
const router = express.Router();
// Public route: Authentication (Login)
router.post('/authenticate', UserManager.authenticateUser);

// Routes requiring JWT token authorization
router.use(authMiddleware);

// Authorized routes
router.post('/register', UserManager.registerUser); // Accessible only to librarians
router.put('/profile', UserManager.manageProfile); // Accessible to authorized users
router.put('/update', UserManager.updateUser); // Accessible to authorized users
router.post('/expire-logins', UserManager.expireOldLogins); // Accessible to authorized users
router.post('/logout', UserManager.logout); // Accessible to authorized users
router.put('/change-password', UserManager.changePassword); // Accessible to authorized users

export default router;
