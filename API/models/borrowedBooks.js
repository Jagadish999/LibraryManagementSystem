class BorrowedBooks {

    constructor(userId, bookId, borrowDate, dbOperations) {
        this.tableName = 'BorrowedBooks';
        this.userId = userId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate;
        this.dbOperations = dbOperations;
    }

    async saveBorrowedBooks (){

        const columnNames = 'UserID, BookID, BorrowDate';
        const dataToInsert = `'${this.userId}', '${this.bookId}', '${this.borrowDate}'`;
        const insertResult = await this.dbOperations.insertData(this.tableName, columnNames, dataToInsert, 'BorrowedBooksID');
        return insertResult;
    }

    async getAllBorrowedBooks (){
        const allData = await this.dbOperations.getAllData(this.tableName);
        return allData;
    }

    async deleteRecord(){

        const whereConditions = `bookId = '${this.bookId}' AND userId = '${this.userId}'`;
        const result = await this.dbOperations.deleteData(this.tableName, whereConditions);

        return result;
    }
}

module.exports = BorrowedBooks;
