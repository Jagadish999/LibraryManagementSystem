class User {

    constructor(name, email, membershipDate, dbOperations) {
        this.tableName = 'Users';
        this.name = name;
        this.email = email;
        this.membershipDate = membershipDate;
        this.dbOperations = dbOperations;
    }

    async saveUser() {

        const columnNames = 'name, email, membershipDate';
        const dataToInsert = `'${this.name}', '${this.email}', '${this.membershipDate}'`;
        const insertResult = await this.dbOperations.insertData(this.tableName, columnNames, dataToInsert, 'userId');
        return insertResult;
    }

    async getAllUsers() {

        const allData = await this.dbOperations.getAllData(this.tableName);
        return allData;
    }

    async getSpecificUser(userId) {

        const fieldNameAndValues = `UserID = ${userId}`;
        const specificUser = await this.dbOperations.getDataByValues(this.tableName, fieldNameAndValues);

        return specificUser;
    }

}

module.exports = User;
