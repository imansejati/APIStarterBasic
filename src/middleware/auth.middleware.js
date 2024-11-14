const jwt = require('jsonwebtoken');
const {
    errorResponse
} = require('../utils/response.util');

/**
 * Middleware untuk memverifikasi JWT token dan melindungi route
 * Flow:
 * 1. Cek keberadaan token di header Authorization
 * 2. Ekstrak token dari header
 * 3. Verifikasi token menggunakan JWT
 * 4. Simpan data user dari token ke request object
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
module.exports = (req, res, next) => {
    try {
        // Ambil header Authorization
        const authHeader = req.headers.authorization;

        // Cek apakah header Authorization ada
        if (!authHeader) {
            return res.status(401).json(errorResponse('Token tidak ditemukan'));
        }

        // Ekstrak token dari format "Bearer <token>"
        const token = authHeader.split(' ')[1];

        // Verifikasi token menggunakan JWT_SECRET dari environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Simpan data user dari token ke request object
        // Data ini bisa diakses di controller berikutnya
        req.userData = decoded;

        // Lanjut ke middleware atau controller berikutnya
        next();
    } catch (error) {
        // Tangani error verifikasi token
        // Bisa terjadi karena:
        // - Token expired
        // - Token tidak valid
        // - Signature tidak valid
        return res.status(401).json(errorResponse('Token tidak valid'));
    }
};