const {
    errorResponse
} = require('../utils/response.util');

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json(errorResponse(err.message));
};