# Main assumption during update endpoint of borrowedBooks API: 

    1. Rows of borrowedBooks is deleted if book is returned as it make conflict with 1-M relation between User and BorrowedBooks


# Make sure to have node js installed in your device
# Make sure to have mysql intalled in your device

Running this Project:

# Database setup:

    1. Create database and tables as provided in SQL_Commans.txt file in mysql workbench.
    2. Provide mysql configuration in dbConnection file inside API/database/dbConnection.js.

# API setup:

    1. Run command: npm install, inside API directory for installing all node packages.
    2. Run command: npm start to start project.


# File Structure:

    1. SQL_Commands has all the required commands for database setup.
    2. API is the main root folder of project.
    3. API/database has all functions required to interact with database.
    4. API/models has models for all the tables.
    5. API/routes has all the routes for all endpoints.


# User API Documentation

    1. Get User by ID:

    EndPoint: 'GET /api/users/:userId'
    Parameters: userId(Integer)
    Response: 200(OK): Success, 400(Bad Request): Bad Request, 404(Not Found): Not Found

    2. Get All User:

    EndPoint: 'GET /api/users'
    Resopnse: 200(OK): Success, 404(Not Found): Not Found

    3. Create New User:

    EndPoint: 'POST /api/users'
    Request Body:
    {
        "name": "some name",
        "email": "someName@example.com",
        "membershipDate": "2023-02-15"
    }
    Response: 200(OK): Success, 400(Bad Request): Bad Request, 500 (Internal Server Error): Failed to insert user.


# Book API Documentation:

    1. Insert New Book:

    EndPoint: 'POST /api/books'
    Request Body:
    {
        "title": "New Book",
        "ISBN": "0987654321",
        "publishedDate": "2023-03-15",
        "genre": "Mystery"
    }
    Response: 201(OK) Created: New book successfully, 400(Bad Request), 500(Internal Server Error): Failed to insert

    2. Get All Books:

    EndPoint: 'GET /api/books'
    Response: 200(OK): Success, 404(NOT FOUND): No Books

    3. Get By Id:

    EndPoint: 'GET /api/books/:bookId'
    Parameters: bookId (Integer)
    Response: 200(OK): Success, 400(BadRequest), 404(Not Found)

    4. Update or Insert Book Details:

    Endpoint: 'PUT /api/bookDetails'
    Request Body:
    {
        "numberOfPages": 300,
        "publisher": "Example Publisher",
        "language": "English"
    }
    Response: 200(OK): Success, 400(Bad Request), 404(Not Found)

# Borrowed Books API Documentation


    1. Record New Borrowed Books

    EndPoint: 'POST /api/borrowedBooks'
    Request Body:
    {
        "userId": 1,
        "bookId": 2,
        "borrowDate": "2023-01-15"
    }
    Response: 200(OK): Success, 400(Bad Request), 500(Internal Server Error)

    2. Get All Borrowed Books

    Endpoint: 'GET /api/borrowedBooks'
    Response: 200(OK), 404(Not Found)

    3. Update System when Book is Returned

    Endpoint: 'PUT /api/borrowedBooks'
    Request Body:
    {
        "userId": 1,
        "bookId": 2,
        "borrowDate": "2023-01-15",
        "returnDate": "2023-02-15"
    }
    Response: 200(OK), 500(Internal Server Error)


