# User Service

User Service is a RESTful API built using Node.js, Express, and PostgreSQL. It provides functionality for user authentication, account management, and basic CRUD operations on a user table in a PostgreSQL database.

It provides the following functionality:

1. User Login (User Service):

   - Test Case 1: Valid User Login

     Input: Valid username and password
     Expected Output: Successful login

   - Test Case 2: Invalid User Login

     Input: Invalid username or password
     Expected Output: Error message

   - Test Case 3: Brute Force Attack Protection

     Input: Multiple invalid login attempts within a short time
     Expected Output: Account lockout or additional security measures

### Database Schema

```SQL
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    user_role VARCHAR(20) NOT NULL,
    school_id INTEGER CHECK (school_id >= 0 AND school_id <= 9999999999),
    mailing_address VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_school_id UNIQUE (school_id),
    CONSTRAINT unique_username UNIQUE (username),
    CONSTRAINT unique_email UNIQUE (email),
    CONSTRAINT unique_phone_number UNIQUE (phone_number),
    CONSTRAINT valid_user_role CHECK (user_role IN ('patron', 'staff', 'librarian'))
);

-- Create the Token table to store authentication tokens
CREATE TABLE tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    token_value VARCHAR(255) NOT NULL UNIQUE,
    expiration_time TIMESTAMP NOT NULL
);
```

## Features

1. **User Authentication**: Utilizes JSON Web Tokens (JWT) for user authentication and authorization.
2. **Database Integration**: Connects to a PostgreSQL database to store and retrieve user information.
3. **Express Framework**: Built on the Express framework for handling HTTP requests and routing.
4. **RESTful API**: Follows RESTful principles for designing APIs.

### Running the Project

Before running the project, make sure to install the required dependencies:

```bash
npm install
```

### Start the Local Server

```bash
npm run start
```

### Start the Database Server

Assuming the database is set up with the required schema and configuration:

```bash
pg_ctl -D /opt/homebrew/var/postgresql@14 start
```

```bash
psql postgres # Launch the PostgreSQL shell
/conninfo # View connection details
```

### API Endpoints

- GET /users: Retrieve a list of all users.
- GET /users/:id: Retrieve details of a specific user (protected route, requires authentication).
- POST /users: Create a new user.
- PUT /users/:id: Update details of a specific user (protected route, requires authentication).
- DELETE /users/:id: Delete a specific user.

### Authentication Endpoints

- POST /auth/login: Login a user and return a JWT.
- POST /auth/signup: Create a new user

### Technology Stack

Node.js
Express
PostgreSQL
JSON Web Tokens (JWT)

### Folder Structure

```sql
user-service/
|-- src/
|   |-- controllers/
|   |   |-- authController.ts
|   |   |-- userController.ts
|   |-- db/
|   |   |-- index.ts
|   |-- middleware/
|   |   |-- authMiddleware.ts
|   |-- models/
|   |   |-- user.ts
|   |-- routes/
|   |   |-- authRouter.ts
|   |   |-- userRouter.ts
|   |-- services/
|   |   |-- authService.ts
|   |   |-- userService.ts
|-- .gitignore
|-- package.json
|-- tsconfig.json
|-- nodemon.json
|-- README.md
```

### Security Considerations

User authentication is implemented using JWT for secure and stateless communication.
Passwords are hashed before storing them in the database to enhance security.
Routes are protected using middleware to ensure that only authenticated users can access them.

### Contributing

Feel free to contribute to the project by opening issues or creating pull requests.
Feel free to customize and expand this template based on your project's specific details and requirements.

_Note: This readme was generated using Chat GPT the complete chat can be found here: https://chat.openai.com/share/2bf9150e-b4b8-4881-a4e8-4985121ca4a1_

_The summary of this project can be found here: https://gist.github.com/maheshmnj/8b39d6928249aad67732be5279d0dd57_
