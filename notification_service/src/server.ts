// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
// ... other setup code for your Express application ...

// Notification Routes
app.use('/api/notifications', notificationRoutes);

// ... other route setup ...

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
