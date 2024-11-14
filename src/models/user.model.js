const db = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * Class User untuk menangani operasi CRUD pada tabel users
 */
class User {
    /**
     * Mencari user berdasarkan email
     * @param {string} email - Email user yang dicari
     * @returns {Promise<Object|null>} Data user atau null jika tidak ditemukan
     */
    static async findByEmail(email) {
        // Eksekusi query untuk mencari user berdasarkan email
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; // Mengembalikan data user pertama yang ditemukan
    }

    /**
     * Mencari user berdasarkan ID
     * @param {number} id - ID user yang dicari
     * @returns {Promise<Object|null>} Data user atau null jika tidak ditemukan
     */
    static async findById(id) {
        // Eksekusi query dengan select terbatas untuk keamanan (tanpa password)
        const [rows] = await db.execute('SELECT id, name, email FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    /**
     * Membuat user baru
     * @param {Object} userData - Data user yang akan dibuat
     * @param {string} userData.name - Nama user
     * @param {string} userData.email - Email user
     * @param {string} userData.password - Password user (belum di-hash)
     * @returns {Promise<number>} ID user yang baru dibuat
     */
    static async create(userData) {
        const {
            name,
            email,
            password
        } = userData;

        // Hash password sebelum disimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert data user baru ke database
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId; // Mengembalikan ID user yang baru dibuat
    }

    /**
     * Mengambil semua data user
     * @returns {Promise<Array>} Array berisi data semua user
     */
    static async getAll() {
        // Select terbatas untuk keamanan (tanpa password)
        const [rows] = await db.execute('SELECT id, name, email FROM users');
        return rows;
    }

    /**
     * Mengupdate data user
     * @param {number} id - ID user yang akan diupdate
     * @param {Object} userData - Data user yang akan diupdate
     * @param {string} userData.name - Nama user baru
     * @param {string} userData.email - Email user baru
     * @returns {Promise<boolean>} True jika berhasil update, false jika gagal
     */
    static async update(id, userData) {
        const {
            name,
            email
        } = userData;

        // Update data user di database
        const [result] = await db.execute(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return result.affectedRows > 0; // Mengembalikan true jika ada baris yang terpengaruh
    }

    /**
     * Menghapus user
     * @param {number} id - ID user yang akan dihapus
     * @returns {Promise<boolean>} True jika berhasil hapus, false jika gagal
     */
    static async delete(id) {
        // Hapus user dari database
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0; // Mengembalikan true jika ada baris yang terpengaruh
    }
}

module.exports = User;