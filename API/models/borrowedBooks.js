class BorrowedBooks {

    constructor(userId, bookId, borrowDate, returnDate) {
        this.userId = userId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
    }
}

module.exports = BorrowedBooks;
