# Prompt Driven Software Development(Micro Service Architecture)

This project seeks to harness the capabilities of GPT-3 throughout the entire software development lifecycle, spanning from requirement gathering to deploying the application in a production environment. As a case study, our focus is on constructing a comprehensive full-stack web application for a library. The frontend is developed using React, while the backend is composed of seven microservices, all generated with the assistance of ChatGPT-3.

### Micro Service Architecture

Microservices are a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight. The benefit of decomposing an application into different smaller services is that it improves modularity. This makes the application easier to understand, develop, test, and become more resilient to architecture erosion. It parallelizes development by enabling small autonomous teams to develop, deploy and scale their respective services independently. It also allows the architecture of an individual service to emerge through continuous refactoring. Microservices-based architectures enable continuous delivery and deployment.

Each New service has been using a [script](./create_service.sh) to generate the boilerplate code for the service. The script is itself generated using GPT-3

### Micro services in this project

- [User Service](./user_service/)
- [Book Service](./book_service/)
- [Checkout Service](./checkout_service/)
- [Request Service](./request_service/)
- [Librarian Service](./librarian_service/)
- [Report Service](./report_service/)
- [Notification Service](./notification_service/)

### Running the Project

Before running the project, make sure to install the required dependencies by going into each micro service directory and running the following command:

```bash
npm install
```

To run the project, go into the root directory and run the following command:

```bash
./start.sh dev # to start all the services in watch mode
```

or

```
./start
```

This will start the database and all the microservices.

### Database Schema by Micro Service

#### 1. User Service:

Table: users

```SQL
-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(100) NOT NULL,
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

-- Create the sessions table for session management
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expiration_time TIMESTAMP NOT NULL
);


    -- Insert 10 rows into the users table

    INSERT INTO users (username, email, password_hash, full_name, user_role, school_id, mailing_address, phone_number)
    VALUES
    ('john_does', 'john.does@email.com', 'hashed_password_1', 'John Doe', 'patron', 123256789, '123 Main St, Cityville', '123-456-7890'),
    ('alice_smith', 'alice.smith@email.com', 'hashed_password_2', 'Alice Smith', 'staff', 987654321, '456 Oak St, Townsville', '987-654-3210'),
    ('bob_jones', 'bob.jones@email.com', 'hashed_password_3', 'Bob Jones', 'patron', 555555555, '789 Pine St, Villagetown', '555-555-5555'),
    ('susan_wang', 'susan.wang@email.com', 'hashed_password_4', 'Susan Wang', 'patron', 111122223, '101 Elm St, Hamlet', '111-222-3333'),
    ('michael_smith', 'michael.smith@email.com', 'hashed_password_5', 'Michael Smith', 'staff', 444433332, '202 Cedar St, Suburbia', '444-333-2222'),
    ('emily_jackson', 'emily.jackson@email.com', 'hashed_password_6', 'Emily Jackson', 'patron', 666677778, '303 Birch St, Countryside', '666-777-8888'),
    ('ryan_lee', 'ryan.lee@email.com', 'hashed_password_7', 'Ryan Lee', 'staff', 999900001, '404 Maple St, Downtown', '999-000-0111'),
    ('jessica_martin', 'jessica.martin@email.com', 'hashed_password_8', 'Jessica Martin', 'patron', 121212121, '505 Oak St, Riverside', '121-212-1212'),
    ('david_smith', 'david.smith@email.com', 'hashed_password_9', 'David Smith', 'patron', 777788889, '606 Pine St, Uptown', '777-888-9999'),
    ('olivia_wood', 'olivia.wood@email.com', 'hashed_password_10', 'Olivia Wood', 'staff', 333344445, '707 Birch St, Outskirts', '333-444-5555');

    INSERT INTO tokens (user_id, token_value, expiration_time)
    VALUES
    (1, 'token_value_1', '2024-01-31 12:00:00'),
    (2, 'token_value_2', '2024-02-15 14:30:00'),
    (3, 'token_value_3', '2024-03-05 18:45:00'),
    (4, 'token_value_4', '2024-04-20 10:15:00'),
    (5, 'token_value_5', '2024-05-10 08:00:00'),
    (6, 'token_value_6', '2024-06-25 16:20:00'),
    (7, 'token_value_7', '2024-07-15 20:30:00'),
    (8, 'token_value_8', '2024-08-05 22:45:00'),
    (9, 'token_value_9', '2024-09-10 11:30:00'),
    (10, 'token_value_10', '2024-10-15 09:00:00');
```

Incase indexing does not start with 1

```SQL
SELECT setval('tokens_token_id_seq', 1, false);
```

#### 2. Book Service:

Tables: books, book_requests

```bash
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    isbn VARCHAR(20),
    publication_date DATE,
    available_copies INTEGER DEFAULT 0,
    total_copies INTEGER DEFAULT 0,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Checkout Service:

Tables: checkouts, checkout_holds

```bash
-- Table for managing checkouts
CREATE TABLE checkouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    book_id INTEGER,
    checkout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    returned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for tracking holds on checked-out items
CREATE TABLE checkout_holds (
    id SERIAL PRIMARY KEY,
    book_id INTEGER,
    user_id INTEGER,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Request Service

```bash
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    justification TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Librarian Service

Does not have a database schema, it interacts with book_service and user_service through REST API calls.

### Report Service

Does not have a database schema, it interacts with checkout service to generate reports.

### Notification Service

Does not have a database schema, it interacts with checkout service and user service to send notifications.
A cron job is scheduled to run every 24 hours to check for due dates and send notifications to users.

> NOTE: For email notifications to work you need to sign in admin and store the login token in .env file.

```
CREATE TABLE notification_preferences (
    user_id INTEGER NOT NULL PRIMARY KEY,
    email_enabled BOOLEAN DEFAULT true,
    in_app_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

<!-- DUMMY Query with real data -->

INSERT INTO notification_preferences (user_id, email_enabled, in_app_enabled) VALUES
(1, true, true),
(2, true, true),
(3, true, true),
(4, true, true),
(5, true, true),
(6, true, true),
(7, true, true),
(8, true, true),
(9, true, true),
(17, true, true);
```

### Roles

In the context of your application, the roles could be associated with different levels of access and permissions. Here's a simple set of roles commonly used in applications:

User: A regular user who can perform basic actions, such as searching for books and viewing information.

Staff: A staff member with additional privileges, such as the ability to submit book requests.

Admin: An administrator with full access and control over the application, including managing users, books, and requests.

### Contributing

Feel free to contribute to the project by opening issues or creating pull requests.
Feel free to customize and expand this template based on your project's specific details and requirements.

<!-- Directory Structure -->

```
-- root
  |-- user_service
  |-- book_service
  |-- checkout_service
  |-- request_service
  |-- librarian_service
  |-- report_service
  |-- notification_service
  |-- library-web-app
  |-- start.sh
  |-- create_service.sh
  |-- README.md
```
