// src/models/User.ts

export class User {
    public username!: string;
    public password!: string;
    public role!: string;
    public name!: string;
    public school_id?: string; // Use a single field for schoolId
    public contact_email!: string;
    public contact_phone?: string;
    public mailing_address?: string;

    constructor(
        username: string,
        password: string,
        role: string,
        name: string,
        school_id: string,
        contact_email: string,
        contact_phone?: string,
        mailing_address?: string,
    ) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.school_id = school_id;
        this.contact_email = contact_email;
        this.contact_phone = contact_phone;
        this.mailing_address = mailing_address;
    }

    isValid(): boolean {
        return (
            this.username !== undefined &&
            this.password !== undefined &&
            this.role !== undefined &&
            this.name !== undefined &&
            this.school_id !== undefined &&
            this.contact_email !== undefined &&
            this.contact_phone !== undefined &&
            this.mailing_address !== undefined
        );
    }
    isEditValid(): boolean {
        return (
            this.username !== undefined &&
            this.role !== undefined &&
            this.name !== undefined &&
            this.school_id !== undefined &&
            this.contact_email !== undefined &&
            this.contact_phone !== undefined &&
            this.mailing_address !== undefined
        );
    }
}

export default User;
