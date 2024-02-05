// src/models/User.ts
class User {
    userId?: number;
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

    constructor({
        username,
        email,
        passwordHash,
        fullName,
        userRole,
        schoolId,
        mailingAddress,
        phoneNumber,
        createdAt,
        updatedAt,
        userId
    }: {
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
        userId?: number;
    }) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.userRole = userRole;
        this.schoolId = schoolId;
        this.mailingAddress = mailingAddress;
        this.phoneNumber = phoneNumber;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default User;
