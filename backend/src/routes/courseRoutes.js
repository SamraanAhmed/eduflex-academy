// Import express for routing
const express = require('express');
const {
  getCourses,
  getCoursesByTrack,
  getCourseById
} = require('../controllers/courseController');

// Create router
const router = express.Router();

// GET ALL COURSES
// Endpoint: GET /api/courses
router.get('/', getCourses);

// GET COURSES BY TRACK
// Endpoint: GET /api/courses/:track
router.get('/:track', getCoursesByTrack);

// GET SINGLE COURSE BY ID
// Endpoint: GET /api/courses/:id
// Note: This route should be AFTER /:track to avoid conflicts
router.get('/id/:id', getCourseById);

module.exports = router;