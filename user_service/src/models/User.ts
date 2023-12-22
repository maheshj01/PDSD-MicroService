// src/models/User.ts

export class User {
    public id!: number;
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
    // add a validation method to the User class

    public validate(): string[] {
        const errors: string[] = [];

        // Check for blank username
        if (!this.username || this.username.trim().length === 0) {
            errors.push('Username cannot be blank.');
        }

        // Check for blank password
        if (!this.password || this.password.trim().length === 0) {
            errors.push('Password cannot be blank.');
        }

        // Check for blank name
        if (!this.name || this.name.trim().length === 0) {
            errors.push('Name cannot be blank.');
        }

        // Check for blank contact email
        if (!this.contact_email || this.contact_email.trim().length === 0) {
            errors.push('Contact email cannot be blank.');
        }

        // Check for blank role
        if (!this.role || this.role.trim().length === 0) {
            errors.push('Role cannot be blank.');
        }

        // Check for blank student ID
        if ((!this.school_id || this.school_id.trim().length === 0)) {
            errors.push('School ID cannot be blank.');
        }

        return errors;
    }

}

export default User;
