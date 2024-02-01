const connection = require('./dbConnection');

module.exports = {

  //Insert data based on table name and columns
  insertData: async (tableName, columns, values, idColumn) => {
    try {
      const result = await connection.promise().query(`INSERT INTO ${tableName} (${columns}) VALUES (${values})`);
      const insertedUser = await connection.promise().query(`SELECT * FROM ${tableName} WHERE ${idColumn} = ${[result[0].insertId]}`);

      return insertedUser[0][0];
    }
    catch (error) {

      //Catch if any duplicate entry error
      if (error.code === 'ER_DUP_ENTRY') {
        console.error('Duplicate entry error:', error);
        return { error: 'Duplicate entry for UNIQUE Value.' };
      }
      else {
        //Any other errors
        console.error('Error inserting data:', error);
        return { error: 'Error inserting data.' };
      }
    }
  },

  getAllData: async (tableName) => {

    try {
      const allData = await connection.promise().query(`SELECT * FROM ${tableName}`);
      return allData[0];
    }
    catch (error) {
      console.error('Error fetching data: ', error);
      return { error: "Error Getting Data" }
    }
  },

  getDataByValues: async (tableName, fieldNameAndValues) => {

    try {
      const specificData = await connection.promise().query(`SELECT * FROM ${tableName} WHERE ${fieldNameAndValues}`);
      return specificData[0][0];
    }
    catch (error) {
      console.error('Error fetching data: ', error);
      return { error: "Error Getting Data" }
    }
  },

  updateData: async (tableName, setValues, whereConditions) => {

    try {
      const updateQuery = await connection.promise().query(`UPDATE ${tableName} SET ${setValues} WHERE ${whereConditions}`);
      const updatedData = await connection.promise().query(`SELECT * from ${tableName} WHERE ${whereConditions}`);

      return updatedData[0][0];
    }
    catch (error) {
      console.error('Error Updating data: ', error);
      return { error: "Error Updating Data" }
    }
  },

  deleteData: async (tableName, whereConditions) => {
    try {
      const deleteQuery = await connection.promise().query(`DELETE FROM ${tableName} WHERE ${whereConditions}`);
      return { message: `Data Updated` };
    }
    catch (error) {
      console.error('Error deleting data:', error);
      return { message: `Error Updating` };
    }
  }
};
