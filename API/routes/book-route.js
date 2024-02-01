const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const db = require('../database/dbOperation');

const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) && date.toString() !== 'Invalid Date';
}

//Update or insert bookDetails
router.put('/bookDetails', async (req, res) => {

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
router.get('/books/:bookId', async (req, res) => {

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
router.get('/books', async (req, res) => {

    const bookObj = new Book(null, null, null, null, db);
    const allBooks = await bookObj.getAllBooks();

    if (allBooks.length === 0) {
        return res.status(404).json({ message: 'No Books' });
    }

    return res.status(400).json(allBooks);
});

//insert books
router.post('/books', async (req, res) => {

    console.log("Books API");

    const { title, ISBN, publishedDate, genre } = req.body;

    // Basic input validation
    if (!title || !ISBN || !publishedDate || !genre) {
        return res.status(400).json({ error: 'Title, ISBN, published date, and genre are required.' });
    }
    else if(!isValidDate(publishedDate)){
        return res.status(400).json({ error: 'Invalid Date' });
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

module.exports = router;