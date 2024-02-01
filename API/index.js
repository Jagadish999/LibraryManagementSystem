//Instance of express for API application
const express = require('express');
const app = express();
const PORT = 3000;

//To parse JSON data
app.use(express.json());

//All Database Operations here
const db = require('./database/dbOperation');

//All models for fetching data and performing db Operations
const User = require('./models/user');
const Book = require('./models/book');
const BookDetails = require('./models/bookDetails');
const BorrowedBooks = require('./models/borrowedBooks');

//For email and date validation
const validateEmail = (email) => {
  return email && typeof email === 'string' && email.includes('@');
};
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date) && date.toString() !== 'Invalid Date';
}

/*
#####################
BorrowedBooks Routes
#####################
*/

//Update system when book is returned
app.put('/api/borrowed-books', async (req, res) => { 
  
  const { userId, bookId, borrowDate, returnDate } = req.body;

  console.log(userId, bookId, borrowDate, returnDate);
  // Basic input validation
  if (!userId || !bookId || !borrowDate || !returnDate) {
    return res.status(400).json({ error: 'UserId, BookId, BorrowDate and returnDate are required.' });
  }

  else if (!isValidDate(borrowDate) && !isValidDate(returnDate)) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  const borrowDateObject = new Date(borrowDate);
  const formattedBorrowDate = borrowDateObject.toISOString().split('T')[0];

  const borrowedBookObj = new BorrowedBooks(userId, bookId, formattedBorrowDate, db);
  const result = await borrowedBookObj.deleteRecord();

  return res.status(500).json(result);
});

//Endpoint to get all borrowed books
app.get('/api/borrowed-books', async (req, res) => { 

  const borrowedBookObj = new BorrowedBooks(null, null, null, db);
  const allborrowedBook= await borrowedBookObj.getAllBorrowedBooks();

  if (allborrowedBook.length === 0) {
    return res.status(404).json({ message: 'No Borrowed Books' });
  }

  return res.status(200).json(allborrowedBook);
});

//Endpoint to record new borrowed-books
app.post('/api/borrowed-books', async (req, res) => {

  const { userId, bookId, borrowDate } = req.body;

  // Basic input validation
  if (!userId || !bookId || !borrowDate) {
    return res.status(400).json({ error: 'UserId, BookId, and BorrowDate are required.' });
  }

  else if (!isValidDate(borrowDate)) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  const borrowDateObject = new Date(borrowDate);
  const formattedBorrowDate = borrowDateObject.toISOString().split('T')[0];


  const borrowedBookObj = new BorrowedBooks(userId, bookId, formattedBorrowDate, db);
  const savedData = await borrowedBookObj.saveBorrowedBooks();

  if (typeof savedData.BorrowedBooksID === 'number') {

    return res.status(200).json({ message: 'New Books Borrowed Data inserted' });
  }

  return res.status(500).json({ savedData });
});













/*
################
Book Routes
################
*/

//Update or insert bookDetails
app.put('/api/bookDetails', async (req, res) => {

  const { bookId, numberOfPages, publisher, language } = req.body;

  // Basic input validation
  if (!numberOfPages || !publisher || !language || !bookId) {
    return res.status(400).json({ error: 'All Book Details required' });
  }

  const bookDetailsObj = new BookDetails(bookId, numberOfPages, publisher, language, db);

  //find if record already existed
  const currentBookDetail = await bookDetailsObj.findSpecificBookDetail();

  //perform updating operation
  if (currentBookDetail) {

    const updatedData = await bookDetailsObj.updateBookDetails();

    if (updatedData.BookID) {
      return res.status(200).json(updatedData);
    }

    return res.status(500).json({ message: "Error Updating Data" });
  }
  else {
    //Perform inserting operation
    const insertBook = await bookDetailsObj.saveBookDetails();

    if (insertBook.BookID) {
      return res.status(200).json({ message: 'Book Details Saved' });
    }

    return res.status(404).json(insertBook);
  }
});

//Get Books with specific Id
app.get('/api/books/:bookId', async (req, res) => {

  const bookId = req.params.bookId;
  const bookObj = new Book(null, null, null, null, db);

  // Parse bookId into a number
  const numericBookId = Number(bookId);

  // Check if the parsed value is a valid number
  if (isNaN(numericBookId) || !Number.isInteger(numericBookId) || numericBookId <= 0) {
    return res.status(400).json({ message: 'Invalid book ID format.' });
  }

  const specificBook = await bookObj.getSpecificBook(numericBookId);

  if (!specificBook) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  return res.status(200).json(specificBook);
});

//Get all books
app.get('/api/books', async (req, res) => {

  const bookObj = new Book(null, null, null, null, db);
  const allBooks = await bookObj.getAllBooks();

  if (allBooks.length === 0) {
    return res.status(404).json({ message: 'No Books' });
  }

  return res.status(400).json(allBooks);
});

//insert books
app.post('/api/books', async (req, res) => {

  console.log("Books API");

  const { title, ISBN, publishedDate, genre } = req.body;

  // Basic input validation
  if (!title || !ISBN || !publishedDate || !genre) {
    return res.status(400).json({ error: 'Title, ISBN, published date, and genre are required.' });
  }

  const membershipDateObject = new Date(publishedDate);
  const formattedMembershipDate = membershipDateObject.toISOString().split('T')[0];

  //instace of book
  const bookObj = new Book(title, ISBN, formattedMembershipDate, genre, db);
  const insertResult = await bookObj.saveBook();

  if (typeof insertResult.BookID === 'number') {
    res.status(201).json({ message: 'New Book Inserted' });
  }

  res.status(500).json({ insertResult });
});


/*
################
User Routes
################
*/
//Get User With Specific Id
app.get('/api/users/:userId', async (req, res) => {

  const userId = req.params.userId;
  const userObj = new User(null, null, null, db);

  // Parse userId into a number
  const numericUserId = Number(userId);

  // Check if the parsed value is a valid number
  if (isNaN(numericUserId) || !Number.isInteger(numericUserId) || numericUserId <= 0) {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  const specificUser = await userObj.getSpecificUser(numericUserId);

  if (!specificUser) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.status(200).json(specificUser);
});

// Get all users from the database
app.get('/api/users', async (req, res) => {

  const userObj = new User(null, null, null, db);
  const allUsers = await userObj.getAllUsers();

  if (allUsers.length === 0) {
    return res.status(404).json({ message: 'No Users' });
  }

  return res.status(200).json(allUsers);
});

//Insert New User in database
app.post('/api/users', async (req, res) => {

  const { name, email, membershipDate } = req.body;



  // Basic input validation, email validation and date validation
  if (!name || !email || !membershipDate) {
    return res.status(400).json({ error: 'Name, email, and membership date are required.' });
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid Email' });
  }
  else if (!isValidDate(membershipDate)) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  //Format date as requried by MySQL
  const membershipDateObject = new Date(membershipDate);
  const formattedMembershipDate = membershipDateObject.toISOString().split('T')[0];

  //instace of user
  const userObj = new User(name, email, formattedMembershipDate, db);
  const insertResult = await userObj.saveUser();

  if (typeof insertResult.UserID === 'number') {
    res.status(200).json({ message: 'New User Inserted' });
  }

  res.status(500).json({ insertResult });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
