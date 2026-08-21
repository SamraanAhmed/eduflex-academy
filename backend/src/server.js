const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables with correct path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verify .env is loading
console.log("JWT Secret Loaded:", process.env.JWT_SECRET ? "Yes ✅" : "No ❌");
console.log("MONGODB URI Loaded:", process.env.MONGODB_URI ? "Yes ✅" : "No ❌");

// Import auth routes AFTER dotenv is configured
const authRoutes = require('./routes/authRoutes');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'EduFlex Academy API is running!'
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// DATABASE CONNECTION & SERVER START
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduflex')
  .then(() => {
    console.log('MongoDB Connected Successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log('Server running on port ' + PORT);
      console.log('Health check: http://localhost:' + PORT + '/api/health');
      console.log('Auth routes:');
      console.log('  POST /api/auth/register');
      console.log('  POST /api/auth/login');
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });