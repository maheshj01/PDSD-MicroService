class UserModel {
    userId: number;
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
    userRole: string;
    schoolId: number;
    mailingAddress: string;
    phoneNumber: string;

    constructor(userData: Partial<UserModel>) {
        this.userId = userData.userId || 0;
        this.username = userData.username || '';
        this.email = userData.email || '';
        this.passwordHash = userData.passwordHash || '';
        this.fullName = userData.fullName || '';
        this.userRole = userData.userRole || '';
        this.schoolId = userData.schoolId || 0;
        this.mailingAddress = userData.mailingAddress || '';
        this.phoneNumber = userData.phoneNumber || '';
    }
}

export default UserModel;
