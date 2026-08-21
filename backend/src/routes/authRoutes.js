const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// REGISTER ROUTE
// POST /api/auth/register
router.post('/register', register);

// LOGIN ROUTE
// POST /api/auth/login
router.post('/login', login);

module.exports = router;