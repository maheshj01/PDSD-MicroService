// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import librarianRoutes from './routes/librarianRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Mount the librarian routes
app.use('/api/librarian', librarianRoutes);

app.listen(PORT, () => {
    console.log(`Librarian Service is running on port ${PORT}`);
});
