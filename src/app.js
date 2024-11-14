// Import package yang dibutuhkan
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables dari file .env
const apiRoutes = require('./routes/api.routes');
const errorHandler = require('./middleware/errorHandler.middleware');

// Inisialisasi aplikasi Express
const app = express();

// Middleware Configuration
app.use(cors()); // Mengizinkan cross-origin requests
app.use(express.json()); // Parser untuk request dengan Content-Type application/json
app.use(express.urlencoded({
    extended: true // Parser untuk form data
}));

// Routing Configuration
// Semua route API akan dimulai dengan prefix '/api'
app.use('/api', apiRoutes);

// Global Error Handler
// Middleware ini akan menangkap semua error yang terjadi di aplikasi
app.use(errorHandler);

// Server Configuration
const PORT = process.env.NODE_DOCKER_PORT || 3000; // Mengambil port dari env atau default 3000
app.listen(PORT, () => {
    console.log(`API Server berjalan di http://localhost:${PORT}`);
});