const {
    errorResponse
} = require('../utils/response.util');

/**
 * Global Error Handler Middleware
 * Menangani semua error yang terjadi di aplikasi
 * 
 * Flow:
 * 1. Menerima error dari middleware/controller sebelumnya
 * 2. Mengambil status code dari error (default: 500)
 * 3. Mengirim response error dengan format yang konsisten
 * 
 * Contoh penggunaan:
 * throw new Error('Something went wrong') -> akan menghasilkan 500 error
 * const error = new Error('Not Found');
 * error.statusCode = 404; -> akan menghasilkan 404 error
 * 
 * @param {Error} err - Error object yang ditangkap
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
module.exports = (err, req, res, next) => {
    // Ambil status code dari error object atau gunakan 500 sebagai default
    const statusCode = err.statusCode || 500;

    // Kirim response error dengan format yang konsisten menggunakan utility function
    res.status(statusCode).json(errorResponse(err.message));

    // Log error untuk debugging (opsional)
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        statusCode: statusCode
    });
};