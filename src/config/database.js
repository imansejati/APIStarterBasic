const mysql = require('mysql2/promise');
require('dotenv').config();
// const mysql = require('mysql2');


// Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost', // Change as needed
//     port: '3307', // Change as needed
//     // host: 'mysql', // Change as needed
//     user: 'root', // Change as needed
//     password: '123456', // Change as needed
//     database: 'dbLatihan'
// });

// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to MySQL database.');
//     }
// });

console.log(process.env.MYSQLDB_HOST);
const pool = mysql.createPool({
    host: process.env.MYSQLDB_HOST,
    // port: process.env.MYSQLDB_LOCAL_PORT,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;