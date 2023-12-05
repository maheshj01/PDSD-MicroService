// src/__tests__/authService.spec.ts
import request from 'supertest';
import authService from '../services/authService';
import app from '../app';

describe('Authentication Service', () => {
  it('should sign up a new user', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const role = "student";
    const name = "John Doe";
    const contact_email = "test.user@gmail.com";
    const contact_phone = "555-1234";
    const mailing_address = "123 Main St; Cityville";
    const created_at = "2023-11-17T23:44:20.719Z";
    const updated_at = "2023-11-17T23:44:20.719Z";

    const result = await authService.signUp(
      username,
      password,
      role,
      name,
      contact_email,
      contact_phone,
      mailing_address,
    );

    // Assert the result or perform other tests as needed
    expect(result).not.toBeNull();
  });

  it('should not sign up a user with an existing username', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const role = "student";
    const name = "John Doe";
    const contact_email = "test.user@gmail.com";
    const contact_phone = "555-1234";
    const mailing_address = "123 Main St; Cityville";
    const created_at = "2023-11-17T23:44:20.719Z";
    const updated_at = "2023-11-17T23:44:20.719Z";

    const result = await authService.signUp(
      username,
      password,
      role,
      name,
      contact_email,
      contact_phone,
      mailing_address,
    );

    // Assert the result or perform other tests as needed
    expect(result).toBeNull();
  });

  it('should log in an existing user', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const result = await authService.logIn(username, password);

    // Assert the result or perform other tests as needed
    expect(result).not.toBeNull();
  });

  it('should not login a non existing user', async () => {
    const username = 'nonexistinguser';
    const password = 'testpassword';
    const result = await authService.logIn(username, password);

    // Assert the result or perform other tests as needed
    expect(result).toBeNull();
  });


});