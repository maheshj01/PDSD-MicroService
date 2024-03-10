// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/requestRoutes';
import dotenv from 'dotenv';
import pool from './database/dbConfig';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Mount the checkout routes
app.use('/api/requests', requestRoutes);

pool
    .connect()
    .then(() => {
        console.log('Request Service Connected to the database');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
