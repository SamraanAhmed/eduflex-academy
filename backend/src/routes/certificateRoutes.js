const express = require('express');
const {
  generateCertificate,
  verifyCertificate,
  getMyCertificates
} = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// PUBLIC - Verify certificate
// GET /api/certificates/verify/:hash
router.get('/verify/:hash', verifyCertificate);

// All routes below require authentication
router.use(protect);

// GENERATE CERTIFICATE
// POST /api/certificates
router.post('/', generateCertificate);

// GET MY CERTIFICATES
// GET /api/certificates/me
router.get('/me', getMyCertificates);

module.exports = router;