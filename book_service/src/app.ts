// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import BookController from './controllers/BookController';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const bookController = new BookController();

app.post('/api/books/add', bookController.addBook);
app.get('/api/books/search', bookController.searchBooks);
// New route for updating availableCopies when a book is checked out
app.put('/api/books/updateCopies', bookController.updateCopies);

app.listen(PORT, () => {
    console.log(`Book Service is running on http://localhost:${PORT}`);
});

export default app;
