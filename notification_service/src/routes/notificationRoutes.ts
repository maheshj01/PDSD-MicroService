// src/routes/notificationRoutes.ts
import express from 'express';
import NotificationController from '../controllers/NotificationController';

const notificationController = new NotificationController();
const router = express.Router();

router.post('/send', notificationController.sendNotification);
router.post('/manage', notificationController.manageNotificationPreferences);

export default router;
