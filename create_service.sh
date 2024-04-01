#!/bin/bash

# Check if a project name is provided as an argument
if [ -z "$1" ]; then
  echo "Please provide a project name as an argument."
  exit 1
fi

if [ -d "$1" ]; then
  echo "Directory $1 already exists."
    while true; do
        read -p "Do you want to overwrite it? (y/n) " yn
        case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
        esac
    done
fi


# Create project directory and navigate into it
mkdir "$1"
cd "$1" || exit

# Initialize a Node.js project
npm init -y

# Install required dependencies
npm install --save-dev typescript ts-node
npx tsc --init
npm install express
npm install --save-dev @types/node @types/express
npm install --save-dev nodemon typescript
npm install express body-parser
npm i --save-dev @types/pg
npm install dotenv
npm install pg
npm install axios

# For Authentication
npm install --save-dev @types/bcrypt
npm install --save-dev @types/jsonwebtoken

# Test Setup
npm install --save-dev jest typescript ts-jest @types/jest
npm install --save-dev @types/supertest

# Create necessary folders
mkdir src
mkdir src/controllers
mkdir src/middleware
mkdir src/models
mkdir src/services
mkdir src/routes
mkdir src/database

# Create necessary files
touch src/controllers/requestController.ts
touch src/middleware/authMiddleware.ts
touch src/models/requestModel.ts
touch src/routes/requestRoutes.ts
touch src/services/requestService.ts
touch src/database/dbConfig.ts

# Create server.ts file
touch src/server.ts

# Create meta files
touch .gitignore
touch .env
touch Readme.md

# Write content to tsconfig.json
echo '{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}' > tsconfig.json

# Write content to .gitignore
echo 'node_modules/
.env
dist/
' > .gitignore

# Write content to .env
echo "PORT=3004
# Database connection
DB_HOST=localhost
DB_PORT=5432
DB_USER=mahesh
DB_PASSWORD=postgres
DB_NAME=$1 

USER_SERVICE_BASE_URL=http://localhost:3000
BOOKS_SERVICE_BASE_URL=http://localhost:3001
CHECKOUT_SERVICE_BASE_URL=http://localhost:3002
REQUEST_SERVICE_BASE_URL=http://localhost:3003
LIBRARIAN_SERVICE_BASE_URL=http://localhost:3004
NOTIFICATION_SERVICE_BASE_URL=http://localhost:3005
" > .env

#Write content to src/server.ts

echo "// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/requestRoutes';
import dotenv from 'dotenv';
import pool from './database/dbConfig';

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());

// Middleware to parse JSON requests
app.use(express.json());

// Mount the checkout routes
app.use('/api/requests', requestRoutes);

pool
    .connect()
    .then(() => {
        console.log('$1 Connected to the database');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
" > src/server.ts

echo "
// db.ts
import { Pool } from 'pg';

const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT) || 5432;
const database = process.env.DB_NAME || 'checkout_service';
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const pool = new Pool({
    host,
    port,
    database,
    user: username,
    password,
});

export default pool;
" > src/database/dbConfig.ts


echo "Project setup completed successfully!"
