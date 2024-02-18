// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import BookController from './controllers/BookController';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const bookController = new BookController();

app.post('/api/books/add', bookController.addBook);
app.get('/api/books/search', bookController.searchBooks);

app.listen(PORT, () => {
    console.log(`Book Service is running on http://localhost:${PORT}`);
});

export default app;
