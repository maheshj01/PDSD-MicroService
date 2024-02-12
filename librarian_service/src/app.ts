import express from 'express';
import bodyParser from 'body-parser';
import LibrarianController from './controllers/LibrarianController';
import dotenv from 'dotenv';
import AuthorizationMiddleware from './middleware/AuthorizationMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());

// Initialize LibrarianController
const librarianController = new LibrarianController();

// Use the AuthorizationMiddleware before the route handler
app.post('/addNewBooks', AuthorizationMiddleware.checkLibrarianPrivileges, librarianController.addNewBooks);
app.post('/registerNewUsers', AuthorizationMiddleware.checkLibrarianPrivileges, librarianController.registerNewUsers);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
