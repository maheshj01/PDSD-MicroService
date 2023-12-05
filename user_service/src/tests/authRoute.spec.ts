// authRoutes.spec.ts
import request from 'supertest';
import app from '../app'; // Import your Express app instance

describe('Authentication Routes', () => {
    it('should sign up a new user', async () => {
        const newUser = {
            "username": "new_user",
            "password": "test123",
            "role": "student",
            "name": "New User",
            "contact_email": "new.user@gmail.com",
            "contact_phone": "657-1234",
            "mailing_address": "1456 Main St, Cityville",
            "created_at": "2023-11-19T23:44:20.719Z",
            "updated_at": "2023-11-19T23:44:20.719Z"
        };

        const response = await request(app)
            .post('/api/auth/signup')
            .send(newUser)
            .expect(201);

        // Assuming your signup route returns the user in the response
        expect(response.body.user).toBeDefined();
    });

    it('should fail to sign up with an existing username', async () => {
        const existingUser = {
            "id": 1,
            "username": "new_user",
            "password": "test123",
            "role": "student",
            "name": "Jamie Doe",
            "contact_email": "new.user@gmail.com",
            "contact_phone": "657-1234",
            "mailing_address": "1456 Main St, Cityville",
            "created_at": "2023-11-19T23:44:20.719Z",
            "updated_at": "2023-11-19T23:44:20.719Z"
        };

        const response = await request(app)
            .post('/api/auth/signup')
            .send(existingUser)
            .expect(409);

        expect(response.body).toEqual({ error: 'Username already exists' });
    });

    it('should log in an existing user', async () => {
        const existingUserCredentials = {
            username: 'jamie_doe',
            password: 'test123',
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(existingUserCredentials)
            .expect(200);

        // Assuming your login route returns a token in the response
        expect(response.body.token).toBeDefined();
    });

    it('should fail to log in with incorrect credentials', async () => {
        const incorrectCredentials = {
            username: 'jamie_doe',
            password: 'wrongpassword',
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(incorrectCredentials)
            .expect(401);

        expect(response.body).toEqual({ error: 'Invalid username or password' });
    });

    // Add more tests as needed
});
