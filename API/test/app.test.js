const request = require('supertest');
const { expect } = require('expect');
const app = require('../index');

//Test cases for POST Request for inserting data of users
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

