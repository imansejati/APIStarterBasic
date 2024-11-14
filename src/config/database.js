const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Konfigurasi koneksi database MySQL
 * Menggunakan environment variables untuk keamanan
 * 
 * Environment variables yang dibutuhkan:
 * - DB_HOST: hostname database
 * - DB_USER: username database
 * - DB_PASSWORD: password database
 * - DB_NAME: nama database
 * - DB_PORT: port database (default: 3306)
 * 
 * Flow koneksi:
 * 1. Baca konfigurasi dari environment variables
 * 2. Buat pool koneksi untuk mengatur koneksi database
 * 3. Export pool untuk digunakan di model
 */

// Konfigurasi koneksi database
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_HOST_PORT || 3306,
    // Konfigurasi tambahan untuk pool koneksi
    waitForConnections: true, // Tunggu jika tidak ada koneksi tersedia
    connectionLimit: 10, // Maksimum koneksi yang dibuat
    queueLimit: 0 // Maksimum antrian request (0 = tidak terbatas)
};

/**
 * Buat pool koneksi database
 * Pool digunakan untuk:
 * - Mengatur multiple koneksi database
 * - Menggunakan kembali koneksi yang sudah ada
 * - Membatasi jumlah koneksi maksimum
 * - Mengatur antrian request database
 */
const pool = mysql.createPool(dbConfig);

// Event handler untuk monitoring koneksi
pool.on('connection', () => {
    console.log('Database: Koneksi baru dibuat');
});

pool.on('error', (err) => {
    console.error('Database Error:', err);
});

// Test koneksi database saat startup
pool.getConnection()
    .then(connection => {
        console.log('Database: Koneksi berhasil');
        connection.release(); // Lepas koneksi kembali ke pool
    })
    .catch(err => {
        console.error('Database: Gagal koneksi -', err.message);
        process.exit(1); // Hentikan aplikasi jika gagal koneksi
    });

/**
 * Export pool koneksi
 * Cara penggunaan di model:
 * const db = require('../config/database');
 * const [rows] = await db.execute('SELECT * FROM users');
 */
module.exports = pool;