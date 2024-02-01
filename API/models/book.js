class Book {

    constructor(title, isbn, publishedDate, genre, dbOperations) {
        this.tableName = 'Books';
        this.title = title;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.genre = genre;
        this.dbOperations = dbOperations;
    }

    async saveBook(){

        const columnNames = 'title, isbn, publisheddate, genre';
        const dataToInsert = `'${this.title}', '${this.isbn}', '${this.publishedDate}', '${this.genre}'`;
        const insertResult = await this.dbOperations.insertData(this.tableName, columnNames, dataToInsert, 'bookId');
        return insertResult;
    }

    async getAllBooks() {

        const allData = await this.dbOperations.getAllData(this.tableName);
        return allData;
    }

    async getSpecificBook(bookId){

        const fieldNameAndValues = `BookID = ${bookId}`;
        const specificBook = await this.dbOperations.getDataByValues(this.tableName, fieldNameAndValues);

        return specificBook;
    }
}

module.exports = Book;
