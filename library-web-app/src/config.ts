// src/config.ts

interface AppConfig {
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    userServiceBaseUrl: string;
    booksServiceBaseUrl: string;
    checkoutServiceBaseUrl: string;
    requestServiceBaseUrl: string;
    librarianServiceBaseUrl: string;
    notificationServiceBaseUrl: string;
    reportServiceBaseUrl: string;
}

const config: AppConfig = {
    port: parseInt(process.env.PORT || "5055", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "",
    dbHost: process.env.DB_HOST || "localhost",
    dbPort: parseInt(process.env.DB_PORT || "5432", 10),
    dbUser: process.env.DB_USER || "mahesh",
    dbPassword: process.env.DB_PASSWORD || "postgres",
    dbName: process.env.DB_NAME || "user_service",
    userServiceBaseUrl: process.env.USER_SERVICE_BASE_URL || "http://localhost:3000",
    booksServiceBaseUrl: process.env.BOOKS_SERVICE_BASE_URL || "http://localhost:3001",
    checkoutServiceBaseUrl: process.env.CHECKOUT_SERVICE_BASE_URL || "http://localhost:3002",
    requestServiceBaseUrl: process.env.REQUEST_SERVICE_BASE_URL || "http://localhost:3003",
    librarianServiceBaseUrl: process.env.LIBRARIAN_SERVICE_BASE_URL || "http://localhost:3004",
    notificationServiceBaseUrl: process.env.NOTIFICATION_SERVICE_BASE_URL || "http://localhost:3005",
    reportServiceBaseUrl: process.env.REPORT_SERVICE_BASE_URL || "http://localhost:3006",
};

export default config;
