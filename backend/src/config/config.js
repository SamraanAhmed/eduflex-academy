// Centralized configuration file
// All environment variables are loaded and validated here

// Import dotenv to load environment variables
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Configuration object with all settings
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/eduflex_academy',
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'eduflexacademy2024secretkey',
    expiresIn: '7d',
  },

  // CORS configuration
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  // API configuration
  api: {
    baseUrl: process.env.API_URL || 'http://localhost:5000',
    version: 'v1',
  },
};

// Validate required configuration
const validateConfig = () => {
  const errors = [];

  if (!config.jwt.secret) {
    errors.push('JWT_SECRET is required but not set in environment variables');
  }

  if (!config.database.uri) {
    errors.push('MONGODB_URI is required but not set in environment variables');
  }

  if (errors.length > 0) {
    console.error('Configuration validation failed:');
    errors.forEach(err => console.error('  - ' + err));
    process.exit(1);
  }

  console.log('Configuration validated successfully');
};

// Run validation
validateConfig();

// Export configuration
module.exports = config;