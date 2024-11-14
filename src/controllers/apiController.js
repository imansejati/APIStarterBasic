const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const {
    successResponse,
    errorResponse
} = require('../utils/response.util');

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json(errorResponse('Email sudah terdaftar'));
        }

        const userId = await User.create({
            name,
            email,
            password
        });
        const user = await User.findById(userId);

        res.status(201).json(successResponse('Registrasi berhasil', user));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json(errorResponse('Email atau password salah'));
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json(errorResponse('Email atau password salah'));
        }

        const token = jwt.sign({
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET, {
                expiresIn: '24h'
            }
        );

        res.json(successResponse('Login berhasil', {
            token
        }));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(successResponse('Data users berhasil diambil', users));
    } catch (error) {
        res.status(500).json(errorResponse(error.message));
    }
};

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