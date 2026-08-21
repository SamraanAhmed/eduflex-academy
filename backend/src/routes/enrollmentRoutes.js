const express = require('express');
const {
  enrollStudent,
  getMyEnrollments,
  updateEnrollment
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// ENROLL IN COURSE
// POST /api/enrollments
router.post('/', enrollStudent);

// GET MY ENROLLMENTS
// GET /api/enrollments/me
router.get('/me', getMyEnrollments);

// UPDATE ENROLLMENT
// PUT /api/enrollments/:id
router.put('/:id', updateEnrollment);

module.exports = router;