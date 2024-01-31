const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 8000;

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
})

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => console.log(`Server Port Listening to Port Number:${PORT}`));