const express = require('express');
const app = express();

// To parse JSON data
app.use(express.json());

// Routes for all endpoints
const routesUsers = require('./routes/user-route');
const routesBooks = require('./routes/book-route');
const routesBorrowedBooks = require('./routes/borrowedBook-route');

// Including all routes in app
app.use('/api/users/', routesUsers);
app.use('/api/', routesBooks);
app.use('/api/borrowed-books', routesBorrowedBooks);

module.exports = app;