// server.ts

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import checkoutRouter from './src/routes/checkoutRoute';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }

  private routes(): void {
    this.app.use(checkoutRouter);
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

const server = new Server();
