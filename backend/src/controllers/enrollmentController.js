// Import models
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// ENROLL STUDENT IN COURSE
// Purpose: Enroll a student in a course
// Endpoint: POST /api/enrollments
// Body: { courseId }
// Auth: Required (student must be logged in)
const enrollStudent = async (req, res) => {
  try {
    // Get student ID from authenticated user (from middleware)
    const studentId = req.student._id;
    
    // Get course ID from request body
    const { courseId } = req.body;

    // Validate courseId is provided
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course ID'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if student is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      studentId: studentId,
      courseId: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Create new enrollment
    const enrollment = new Enrollment({
      studentId: studentId,
      courseId: courseId,
      status: 'active',
      progress: 0
    });

    await enrollment.save();

    // Populate course details for response
    await enrollment.populate('courseId', 'title track instructor');

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during enrollment',
      error: error.message
    });
  }
};

// GET ALL ENROLLMENTS FOR LOGGED-IN STUDENT
// Purpose: Get all courses a student is enrolled in
// Endpoint: GET /api/enrollments/me
// Auth: Required (student must be logged in)
const getMyEnrollments = async (req, res) => {
  try {
    const studentId = req.student._id;

    const enrollments = await Enrollment.find({ studentId: studentId })
      .populate('courseId', 'title track instructor duration price thumbnail')
      .sort({ enrolledAt: -1 }); // Newest first

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No enrollments found'
      });
    }

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });

  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enrollments',
      error: error.message
    });
  }
};

// UPDATE ENROLLMENT PROGRESS
// Purpose: Update progress for a specific enrollment
// Endpoint: PUT /api/enrollments/:id
// Body: { progress, status }
// Auth: Required
const updateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const { progress, status } = req.body;
    const studentId = req.student._id;

    // Find enrollment
    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      studentId: studentId
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update fields if provided
    if (progress !== undefined) {
      enrollment.progress = Math.min(100, Math.max(0, progress));
    }

    if (status) {
      const validStatuses = ['active', 'completed', 'dropped'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Allowed: active, completed, dropped'
        });
      }
      enrollment.status = status;
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: 'Enrollment updated successfully',
      data: enrollment
    });

  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating enrollment',
      error: error.message
    });
  }
};

// Export controllers
module.exports = {
  enrollStudent,
  getMyEnrollments,
  updateEnrollment
};