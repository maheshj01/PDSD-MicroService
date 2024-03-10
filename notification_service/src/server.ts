// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import notificationRoutes from './routes/notificationRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
// ... other setup code for your Express application ...

// Notification Routes
app.use('/api/notifications', notificationRoutes);

// ... other route setup ...

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
