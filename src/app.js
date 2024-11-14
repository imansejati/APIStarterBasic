const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
const errorHandler = require('./middleware/errorHandler.middleware');
require("dotenv").config();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('horee');
    console.log(process.env.PORT);
    console.log(`API Server berjalan di http://localhost:${PORT}`);
});