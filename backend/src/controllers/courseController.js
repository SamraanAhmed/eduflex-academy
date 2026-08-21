// Import Course model
const Course = require('../models/Course');

// GET ALL COURSES
// Purpose: Get all courses from database
// Endpoint: GET /api/courses
const getCourses = async (req, res) => {
  try {
    // Fetch all courses from database
    const courses = await Course.find();
    
    // Check if courses exist
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courses found'
      });
    }

    // Send success response with courses
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses',
      error: error.message
    });
  }
};

// GET COURSES BY TRACK
// Purpose: Get courses filtered by track
// Endpoint: GET /api/courses/:track
// Track values: fullstack, datascience, cybersecurity, uiux
const getCoursesByTrack = async (req, res) => {
  try {
    // Get track from URL parameter
    const track = req.params.track;
    
    // Validate track - only allow specific values
    const validTracks = ['fullstack', 'datascience', 'cybersecurity', 'uiux'];
    if (!validTracks.includes(track)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid track. Allowed tracks: fullstack, datascience, cybersecurity, uiux'
      });
    }

    // Find courses by track
    const courses = await Course.find({ track: track });
    
    // Check if any courses found
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No courses found for track: ${track}`
      });
    }

    // Send success response with filtered courses
    res.status(200).json({
      success: true,
      track: track,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get courses by track error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses by track',
      error: error.message
    });
  }
};

// GET SINGLE COURSE BY ID
// Purpose: Get a single course by its ID
// Endpoint: GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    // Get course ID from URL parameter
    const courseId = req.params.id;
    
    // Find course by ID
    const course = await Course.findById(courseId);
    
    // Check if course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Send success response with course
    res.status(200).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Get course by ID error:', error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course',
      error: error.message
    });
  }
};

// Export all controllers
module.exports = {
  getCourses,
  getCoursesByTrack,
  getCourseById
};