// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import LibrarianController from './controllers/LibrarianController';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());

const librarianController = new LibrarianController();

// Routes for LibrarianController
app.post('/addNewBooks', librarianController.addNewBooks.bind(librarianController));
app.post('/registerNewUsers', librarianController.registerNewUsers.bind(librarianController));

app.listen(PORT, () => {
    console.log(`Library Service is running on http://localhost:${PORT}`);
});
