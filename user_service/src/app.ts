// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authRouter from './routes/authRouter';
import pool from './db';
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);

pool
    .connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;