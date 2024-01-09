// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import { pool } from './config/config';
import dotenv from "dotenv";
import cors from 'cors';
const app = express();
dotenv.config();

const PORT = process.env.PORT;
const corsOptions = {
    origin: [process.env.CLIENT_BASE_URL || 'http://localhost:5055', 'https://www.getpostman.com'], // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies, if your application uses them
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
    // headers: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', bookRoutes);

// Connect to the database
pool
    .connect()
    .then(() => {
        console.log('Book Service Connected to the database');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;