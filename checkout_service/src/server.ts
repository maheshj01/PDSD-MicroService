// server.ts

import express from 'express';
import checkoutRoutes from './routes/checkoutRoute';
import CheckoutController from './controllers/checkoutController';
import CheckoutService from './services/checkoutService';
import pool from './db/index';
import dotenv from "dotenv";
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Create instances of services and controllers

// Mount the checkout routes
app.use('/api', checkoutRoutes);

pool
  .connect()
  .then(() => {
    console.log('CheckoutService Connected to the database');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;