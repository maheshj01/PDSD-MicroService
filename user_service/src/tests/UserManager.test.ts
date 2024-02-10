// src/__tests__/userManager.test.ts
import supertest from 'supertest';
import app from '../app'; // Assuming 'index' is the entry point of your Express app

const request = supertest(app);

describe('User Manager APIs', () => {
    let authToken: string; // Store the authentication token for later use in other tests

    it('should register a new user', async () => {
        const response = await request.post('/api/user/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            full_name: 'Test User',
            password: 'testpassword',
            user_role: 'patron',
            school_id: "04034313",
            phone_number: "5341231567",
            mailing_address: "453 Main Street, Apt 10, New Bedford, MA, 02740"
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should authenticate a user and return a token', async () => {
        const response = await request.post('/api/authenticate').send({
            username: 'testuser',
            password: 'testpassword',
        });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

        // Save the authentication token for future requests
        authToken = response.body.token;
    });

    it('should update user profile', async () => {
        const response = await request.put('/api/user/:userId').send({
            username: 'updateduser',
            mailing_address: 'New Address',
            phone_number: '1234567890',
        })
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User profile updated successfully');
    });

    it('should retrieve user by ID', async () => {
        // Assuming you have a user ID from the registration response
        const userId = '1234567890';

        const response = await request.get(`/api/user/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.userId).toBe(userId);
    });

    // Add more test cases for other APIs
});
