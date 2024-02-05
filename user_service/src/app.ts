// src/index.ts
import express from 'express';
import Database from './utils/Database';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database when the application starts
Database.connect()
    .then(() => {
        console.log('Connected to the database');
        startServer();
    })
    .catch((error: any) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });

function startServer() {
    // Other middleware and routes setup
    app.use(express.json());

    // Example route setup for user-related routes
    app.use('/api/user', userRoutes);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
