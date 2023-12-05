// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import { pool } from './config/config';
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/api', bookRoutes);

// Connect to the database
pool
    .connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;