// src/routes/notificationRoutes.ts
import express from 'express';
import NotificationController from '../controllers/NotificationController';
import { verifyToken } from '../middleware/AuthMiddleware';
import { roleMiddleware } from '../middleware/Rolemiddleware';

const router = express.Router();

// Apply middleware to validate user token
// router.use(verifyToken);

// Apply role-based middleware to allow only librarians and admins
// router.use(roleMiddleware(['librarian', 'admin']));

router.post('/send-email', NotificationController.sendEmailNotification);
router.post('/send-in-app', NotificationController.sendInAppNotification);

export default router;
