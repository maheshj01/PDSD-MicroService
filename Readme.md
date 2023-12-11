# Prompt Driven Software Development(Micro Service Architecture)

### Micro Service Architecture

Microservices are a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight. The benefit of decomposing an application into different smaller services is that it improves modularity. This makes the application easier to understand, develop, test, and become more resilient to architecture erosion. It parallelizes development by enabling small autonomous teams to develop, deploy and scale their respective services independently. It also allows the architecture of an individual service to emerge through continuous refactoring. Microservices-based architectures enable continuous delivery and deployment.

### Micro services in this project

- User Service
- Book Service
- Checkout Service

### Running the Project

Before running the project, make sure to install the required dependencies by going into each micro service directory and running the following command:

```bash
npm install
```

To run the project, go into the root directory and run the following command:

```bash
./start.sh
```

This will start the database and all the micro services.

### Database Schema by Micro Service

#### 1. User Service:

Table: users

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    student_id VARCHAR(20),
    staff_id VARCHAR(20),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    mailing_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. Book Service:

Tables: books, book_checkouts, book_requests

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

CREATE TABLE book_checkouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    checkout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    returned BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Checkout Service:

Tables: checkouts, checkout_renewals, checkout_holds

```bash
-- Schema Creation
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

-- Table for handling checkout renewals
CREATE TABLE checkout_renewals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    checkout_id INTEGER,
    renewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    new_due_date TIMESTAMP,
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

```
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

### Contributing

Feel free to contribute to the project by opening issues or creating pull requests.
Feel free to customize and expand this template based on your project's specific details and requirements.
