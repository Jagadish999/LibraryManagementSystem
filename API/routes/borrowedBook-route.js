const express = require('express');
const router = express.Router();

const BorrowedBooks = require('../models/borrowedBooks');
const db = require('../database/dbOperation');

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date) && date.toString() !== 'Invalid Date';
}


//Update system when book is returned
router.put('', async (req, res) => {

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
router.get('', async (req, res) => {

  const borrowedBookObj = new BorrowedBooks(null, null, null, db);
  const allborrowedBook = await borrowedBookObj.getAllBorrowedBooks();

  if (allborrowedBook.length === 0) {
    return res.status(404).json({ message: 'No Borrowed Books' });
  }

  return res.status(200).json(allborrowedBook);
});

//Endpoint to record new borrowed-books
router.post('', async (req, res) => {

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

module.exports = router;