const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'LibraryManagementDB'
});

db.connect((err) => {
    if(err){
        console.log('Error Connectiong Database' + err);
        return;
    }
    
    console.log('Connection Establisted');
});

module.exports = db;