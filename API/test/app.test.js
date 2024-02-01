const request = require('supertest');
const { expect } = require('expect');
const app = require('../index');

//Test Case for returning all users data
describe('GET /api/users', () => {

  it('should return all users data', async () => {

    const user = {
      name: 'user',
      email: 'user2@gmail.com',
      membershipDate: '2022-01-01',
    };

    const userInsertion = await request(app).post('/api/users').send(user).expect(200);
    const response = await request(app).get('/api/users').expect(200);
  });
});

describe('POST /api/users', () => {

  //Test for empty detail submission
  it('should not allow users to submit empty fields', async () => {
    const emptyUser = {};

    const response = await request(app)
      .post('/api/users')
      .send(emptyUser)
      .expect(400);

    expect(response.body.error).toBe('Name, email, and membership date are required.');
  });

  //Test for creating users
  it('should create two new users and return status 200 with success message', async () => {
    const user1 = {
      name: 'Jagadish Parajuli',
      email: 'jagadish@gmail.com',
      membershipDate: '2022-01-01',
    };

    const user2 = {
      name: 'Roshan Aryal',
      email: 'roshan@gmail.com',
      membershipDate: '2022-01-02',
    };

    // Create user1
    const response1 = await request(app)
      .post('/api/users')
      .send(user1)
      .expect(200);

    expect(response1.body.message).toBe('New User Inserted');

    // Create user2
    const response2 = await request(app)
      .post('/api/users')
      .send(user2)
      .expect(200);

    expect(response2.body.message).toBe('New User Inserted');
  });
});

describe('Borrowed Books API', () => {
  // Test for updating returned books
  describe('PUT /api/borrowed-books', () => {
    it('should update the system when a book is returned and return status 500', async () => {
      // Assuming you have data to simulate a borrowed book that is being returned
      const returnedBook = {
        userId: 1,
        bookId: 1,
        borrowDate: '2022-01-01',
        returnDate: '2022-01-10',
      };

      const response = await request(app)
        .put('/api/borrowed-books')
        .send(returnedBook)
        .expect(500);

    });
  });

  // Test for getting all borrowed books
  describe('GET /api/borrowed-books', () => {
    it('should return all borrowed books and status 200', async () => {
      const response = await request(app)
        .get('/api/borrowed-books')
        .expect(200);

    });
  });

  // Test for recording new borrowed books
  describe('POST /api/borrowed-books', () => {
    it('should record new borrowed books and return status 200 with success message', async () => {
      const newBorrowedBook = {
        userId: 1,
        bookId: 2,
        borrowDate: '2022-02-01',
      };

      const response = await request(app)
        .post('/api/borrowed-books')
        .send(newBorrowedBook)
        .expect(200);

    });

    it('should return status 400 with an error message for missing required fields', async () => {
      const invalidBorrowedBook = {};

      const response = await request(app)
        .post('/api/borrowed-books')
        .send(invalidBorrowedBook)
        .expect(400);
    });

    it('should return status 400 with an error message for invalid date format', async () => {
      const invalidDateBorrowedBook = {
        userId: 1,
        bookId: 1,
        borrowDate: 'invalid-date',
      };

      const response = await request(app)
        .post('/api/borrowed-books')
        .send(invalidDateBorrowedBook)
        .expect(400);

    });
  });
});






describe('POST /api/books', () => {
  // Test for successful book insertion
  it('should insert a new book and return status 201 with success message', async () => {
    const newBook = {
      title: 'Sample Book',
      ISBN: '12345678901',
      publishedDate: '2022-01-01',
      genre: 'Fiction',
    };

    const response = await request(app)
      .post('/api/books')
      .send(newBook)
      .expect(201);

    expect(response.body.message).toBe('New Book Inserted');
  });

  // Test for missing required fields
  it('should return status 400 with an error message for missing required fields', async () => {
    const invalidBook = {
      title: 'Sample Book',
      // Missing ISBN, publishedDate, and genre
    };

    const response = await request(app)
      .post('/api/books')
      .send(invalidBook)
      .expect(400);

    expect(response.body.error).toBe('Title, ISBN, published date, and genre are required.');
  });

  // Test for invalid date format
  it('should return status 400 with an error message for invalid date format', async () => {
    const invalidDateBook = {
      title: 'Sample Book',
      ISBN: '1234567890',
      publishedDate: 'invalid-date',
      genre: 'Fiction',
    };

    const response = await request(app)
      .post('/api/books')
      .send(invalidDateBook)
      .expect(400);

    expect(response.body.error).toBe('Invalid Date');
  });
});

//Test cases for POST Request for inserting data of users