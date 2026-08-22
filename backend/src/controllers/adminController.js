// Import models
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// ============================================
// ENROLLMENT MANAGEMENT (Admin)
// ============================================

// GET ALL ENROLLMENTS
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('studentId', 'name email')
      .populate('courseId', 'title track instructor')
      .sort({ enrolledAt: -1 });

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
    console.error('Get all enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching enrollments',
      error: error.message
    });
  }
};

// UPDATE ENROLLMENT STATUS
const updateEnrollmentStatus = async (req, res) => {
  try {
    const enrollmentId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['active', 'completed', 'dropped'];
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status. Allowed: active, completed, dropped'
      });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed: active, completed, dropped'
      });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { status: status },
      { new: true, runValidators: true }
    )
      .populate('studentId', 'name email')
      .populate('courseId', 'title track');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment status updated successfully',
      data: enrollment
    });

  } catch (error) {
    console.error('Update enrollment status error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating enrollment',
      error: error.message
    });
  }
};

// ============================================
// COURSE MANAGEMENT (Admin)
// ============================================

// GET ALL COURSES
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No courses found'
      });
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });

  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses',
      error: error.message
    });
  }
};

// CREATE COURSE
const createCourse = async (req, res) => {
  try {
    const { title, description, track, instructor, duration, price, thumbnail } = req.body;

    if (!title || !track || !instructor || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide: title, track, instructor, duration'
      });
    }

    const validTracks = ['fullstack', 'datascience', 'cybersecurity', 'uiux'];
    if (!validTracks.includes(track)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid track. Allowed: fullstack, datascience, cybersecurity, uiux'
      });
    }

    const course = new Course({
      title,
      description: description || '',
      track,
      instructor,
      duration,
      price: price || 0,
      thumbnail: thumbnail || 'default-course.jpg'
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating course',
      error: error.message
    });
  }
};

// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, track, instructor, duration, price, thumbnail } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (track) updateData.track = track;
    if (instructor) updateData.instructor = instructor;
    if (duration) updateData.duration = duration;
    if (price !== undefined) updateData.price = price;
    if (thumbnail) updateData.thumbnail = thumbnail;

    if (track) {
      const validTracks = ['fullstack', 'datascience', 'cybersecurity', 'uiux'];
      if (!validTracks.includes(track)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid track. Allowed: fullstack, datascience, cybersecurity, uiux'
        });
      }
    }

    const course = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });

  } catch (error) {
    console.error('Update course error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating course',
      error: error.message
    });
  }
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const enrollments = await Enrollment.find({ courseId: courseId });
    if (enrollments.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course. ' + enrollments.length + ' students are enrolled.'
      });
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course',
      error: error.message
    });
  }
};

// Export all controllers
module.exports = {
  getAllEnrollments,
  updateEnrollmentStatus,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse
};