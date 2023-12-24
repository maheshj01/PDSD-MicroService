// src/server.ts

import express from 'express';
import reportRoutes from './routes/reportRoutes';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/reports', reportRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Report Service is running at http://localhost:${PORT}`);
});
