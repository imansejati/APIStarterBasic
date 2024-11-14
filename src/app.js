const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api.routes');
const errorHandler = require('./middleware/errorHandler.middleware');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// API Routes
app.use('/api', apiRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Server berjalan di http://localhost:${PORT}`);
});