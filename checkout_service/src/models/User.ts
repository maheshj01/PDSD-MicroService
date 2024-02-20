// src/models/User.ts

export interface User {
    userId: string;
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
    userRole: string;
    schoolId: number;
    mailingAddress: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
