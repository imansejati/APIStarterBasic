const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.post('/auth/login', apiController.login);
router.post('/auth/register', apiController.register);

// Protected routes
router.use(authMiddleware);
router.get('/users', apiController.getUsers);
router.get('/users/:id', apiController.getUserById);
router.put('/users/:id', apiController.updateUser);
router.delete('/users/:id', apiController.deleteUser);

module.exports = router;