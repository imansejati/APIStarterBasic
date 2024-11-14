const jwt = require('jsonwebtoken');
const {
    errorResponse
} = require('../utils/response.util');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json(errorResponse('Token tidak ditemukan'));
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json(errorResponse('Token tidak valid'));
    }
};