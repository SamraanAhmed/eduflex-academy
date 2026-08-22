const express = require('express');
const {
  getAllEnrollments,
  updateEnrollmentStatus,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

const router = express.Router();

// All admin routes require authentication AND admin role
router.use(protect);
router.use(adminAuth);

// ============================================
// ENROLLMENT ROUTES (Admin)
// ============================================

// GET all enrollments
router.get('/enrollments', getAllEnrollments);

// UPDATE enrollment status
router.patch('/enrollments/:id', updateEnrollmentStatus);

// ============================================
// COURSE ROUTES (Admin)
// ============================================

// GET all courses
router.get('/courses', getAllCourses);

// CREATE new course
router.post('/courses', createCourse);

// UPDATE course
router.put('/courses/:id', updateCourse);

// DELETE course
router.delete('/courses/:id', deleteCourse);

module.exports = router;