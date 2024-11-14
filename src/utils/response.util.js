/**
 * Utility functions untuk membuat format response yang konsisten
 * Format response mengikuti struktur:
 * {
 *    success: boolean,
 *    message: string,
 *    data?: any
 * }
 */

/**
 * Membuat response sukses dengan format standar
 * 
 * Contoh penggunaan:
 * successResponse('Login berhasil', { token: 'jwt-token' })
 * => {
 *      success: true,
 *      message: 'Login berhasil',
 *      data: { token: 'jwt-token' }
 *    }
 * 
 * @param {string} message - Pesan sukses yang akan ditampilkan
 * @param {any} [data] - Data opsional yang akan dikirim ke client
 * @returns {Object} Object response dengan format standar
 */
exports.successResponse = (message, data = null) => {
    // Buat object response dasar
    const response = {
        success: true,
        message: message
    };

    // Tambahkan data ke response jika ada
    if (data) {
        response.data = data;
    }

    return response;
};

/**
 * Membuat response error dengan format standar
 * 
 * Contoh penggunaan:
 * errorResponse('Email atau password salah')
 * => {
 *      success: false,
 *      message: 'Email atau password salah'
 *    }
 * 
 * @param {string} message - Pesan error yang akan ditampilkan
 * @param {any} [errors] - Detail error opsional (misalnya untuk validasi)
 * @returns {Object} Object response dengan format standar
 */
exports.errorResponse = (message, errors = null) => {
    // Buat object response dasar
    const response = {
        success: false,
        message: message
    };

    // Tambahkan detail error ke response jika ada
    if (errors) {
        response.errors = errors;
    }

    return response;
};

/**
 * Membuat response validasi error dengan format standar
 * 
 * Contoh penggunaan:
 * validationErrorResponse([
 *   { field: 'email', message: 'Email tidak valid' },
 *   { field: 'password', message: 'Password minimal 6 karakter' }
 * ])
 * 
 * @param {Array} errors - Array berisi object error validasi
 * @returns {Object} Object response dengan format standar
 */
exports.validationErrorResponse = (errors) => {
    return {
        success: false,
        message: 'Validasi gagal',
        errors: errors
    };
};