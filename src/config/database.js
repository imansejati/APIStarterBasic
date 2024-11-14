const mysql = require('mysql2/promise');
require('dotenv').config();
// const mysql = require('mysql2');


// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_HOST_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// // Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to MySQL database.');
//     }
// });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_HOST_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;