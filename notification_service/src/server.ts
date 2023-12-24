// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import NotificationService from './services/NotificationService';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
// ... other setup code for your Express application ...

// Schedule a daily task to process due date notifications
schedule.scheduleJob('0 0 * * *', async () => {
    try {
        await NotificationService.processDueDateNotifications();
    } catch (error: any) {
        console.error('Error in scheduled task:', error);
    }
});

// Notification Routes
app.use('/api/notifications', notificationRoutes);

// ... other route setup ...

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
