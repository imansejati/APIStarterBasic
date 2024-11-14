const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {
    successResponse,
    errorResponse
} = require('../utils/response.util');

/**
 * Controller untuk menangani registrasi user baru
 * @param {Request} req - Express request object berisi data user (name, email, password)
 * @param {Response} res - Express response object
 */
exports.register = async (req, res) => {
    try {
        // Ekstrak data dari request body
        const {
            name,
            email,
            password
        } = req.body;

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json(errorResponse('Email sudah terdaftar'));
        }

        // Buat user baru dan ambil datanya
        const userId = await User.create({
            name,
            email,
            password
        });
        const user = await User.findById(userId);

        // Kirim response sukses
        res.status(201).json(successResponse('Registrasi berhasil', user));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk menangani proses login user
 * @param {Request} req - Express request object berisi credentials (email, password)
 * @param {Response} res - Express response object
 */
exports.login = async (req, res) => {
    try {
        // Ekstrak credentials dari request body
        const {
            email,
            password
        } = req.body;

        // Cek apakah user dengan email tersebut ada
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json(errorResponse('Email atau password salah'));
        }

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json(errorResponse('Email atau password salah'));
        }

        // Generate JWT token
        const token = jwt.sign({
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET, {
                expiresIn: '24h'
            }
        );

        // Kirim response dengan token
        res.json(successResponse('Login berhasil', {
            token
        }));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk mendapatkan daftar semua user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(successResponse('Data users berhasil diambil', users));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk mendapatkan data user berdasarkan ID
 * @param {Request} req - Express request object dengan params.id
 * @param {Response} res - Express response object
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(errorResponse('User tidak ditemukan'));
        }
        res.json(successResponse('Data user berhasil diambil', user));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk mengupdate data user
 * @param {Request} req - Express request object dengan params.id dan body berisi data update
 * @param {Response} res - Express response object
 */
exports.updateUser = async (req, res) => {
    try {
        const updated = await User.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json(errorResponse('User tidak ditemukan'));
        }
        const user = await User.findById(req.params.id);
        res.json(successResponse('User berhasil diupdate', user));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk menghapus user
 * @param {Request} req - Express request object dengan params.id
 * @param {Response} res - Express response object
 */
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json(errorResponse('User tidak ditemukan'));
        }
        res.json(successResponse('User berhasil dihapus'));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

/**
 * Controller untuk menangani proses logout user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
exports.logout = async (req, res) => {
    try {
        // Dalam implementasi JWT, logout sebenarnya dilakukan di client side
        // dengan menghapus token dari localStorage/cookie

        // Opsi pengembangan:
        // 1. Simpan token yang sudah logout ke blacklist
        // 2. Update status user menjadi offline
        // 3. Hapus refresh token jika menggunakan sistem refresh token

        res.json(successResponse('Logout berhasil'));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};