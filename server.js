const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse request body
app.use(express.json());

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const diagnosisRoutes = require('./src/routes/diagnosisRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/diagnosis', diagnosisRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});