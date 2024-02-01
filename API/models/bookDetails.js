class BookDetails {
    constructor(bookId, numberOfPages, publisher, language, dbOperations) {
        this.tableName = 'BookDetails';
        this.bookId = bookId;
        this.numberOfPages = numberOfPages;
        this.publisher = publisher;
        this.language = language;
        this.dbOperations = dbOperations;
    }

    async saveBookDetails(){

        const columnNames = 'bookID, numberOfPages, publisher, language';
        const dataToInsert = `'${this.bookId}', '${this.numberOfPages}', '${this.publisher}', '${this.language}'`;
        const insertResult = await this.dbOperations.insertData(this.tableName, columnNames, dataToInsert, 'detailsId');
        return insertResult;
    }

    async findSpecificBookDetail(){

        const fieldNameAndValues = `bookID = ${this.bookId}`;
        const specificBook = await this.dbOperations.getDataByValues(this.tableName, fieldNameAndValues);

        return specificBook;
    }

    async updateBookDetails(){

        //updateData: async (tableName, setValues, whereConditions)
        const setValues = `numberOfPages = '${this.numberOfPages}', publisher = '${this.publisher}', language = '${this.language}'`;
        const whereCondition = `bookID = ${this.bookId}`;

        const updatedData = await this.dbOperations.updateData(this.tableName, setValues, whereCondition);
        console.log(updatedData);
        return updatedData;
    }
}

module.exports = BookDetails;
