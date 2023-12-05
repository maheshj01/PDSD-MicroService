// bookService.test.ts

import request from 'supertest';
import app from '../src/index'; // Assuming you have an Express app
import BookService from '../src/services/bookService';
import Book from '../src/models/Book';

describe('Book Service Tests', () => {
  beforeAll(async () => {
    // Setup tasks (e.g., database connection, seed data)
    // You might want to seed your database with sample data for testing
    // Ensure the database is in a known state before running tests
  });

  afterAll(async () => {
    // Teardown tasks (e.g., close database connection, cleanup)
    // You might want to rollback any changes made during testing
  });

  test('Search for Books by Title', async () => {
    const response = await request(app).get('/api/books/?title=The Great Gatsby');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    // Add more assertions based on your expected response format
  });

  test('Search for Books by Author', async () => {
    const response = await request(app).get('/api/books/?author=F. Scott Fitzgerald');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    // Add more assertions based on your expected response format
  });

  test('View Book Details', async () => {
    // Assuming you have book details available
    const sampleBook = await BookService.getBookById(1);
    const response = await request(app).get(`/api/books/${sampleBook.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(sampleBook);
  });

  test('Add Book to Collection', async () => {
    // Assuming you have book details available
    const newBookData = {
      title: 'New Book',
      author: 'New Author',
      category: 'Fiction',
      availabilityStatus: 'Available',
    };
    const response = await request(app).post('/api/books/').send(newBookData);
    expect(response.status).toBe(201);
    // Ensure the book is added to the collection in the database
    const addedBook = await BookService.getBookDetailsById(response.body.id);
    expect(addedBook).toBeTruthy();
    // Add more assertions based on your expected response format
  });

  // Add more test cases for other user stories

  // Test case for searching with invalid parameters
  test('Search with Invalid Parameters', async () => {
    const response = await request(app).get('/api/books/?invalidParam=invalidValue');
    expect(response.status).toBe(400);
    // Add more assertions based on your expected error response format
  });
});

