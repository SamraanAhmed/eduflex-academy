// Import models
const Certificate = require('../models/Certificate');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Student = require('../models/Student');

// GENERATE CERTIFICATE
// Purpose: Generate certificate for completed course
// Endpoint: POST /api/certificates
// Body: { enrollmentId }
// Auth: Required (student must be logged in)
const generateCertificate = async (req, res) => {
  try {
    const studentId = req.student._id;
    const { enrollmentId } = req.body;

    // Validate enrollmentId is provided
    if (!enrollmentId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide enrollment ID'
      });
    }

    // Find enrollment and verify it belongs to student
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

    // Check if course is completed (100% progress)
    if (enrollment.progress < 100) {
      return res.status(400).json({
        success: false,
        message: 'Course not completed yet. Progress must be 100%'
      });
    }

    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({
      studentId: studentId,
      courseId: enrollment.courseId
    });

    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: 'Certificate already generated for this course'
      });
    }

    // Generate unique hash
    const hash = 'CERT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create certificate
    const certificate = new Certificate({
      studentId: studentId,
      courseId: enrollment.courseId,
      hash: hash,
      issueDate: new Date(),
      isVerified: true
    });

    await certificate.save();

    // Update enrollment status to completed
    enrollment.status = 'completed';
    await enrollment.save();

    // Populate student and course details
    await certificate.populate('studentId', 'name email');
    await certificate.populate('courseId', 'title track instructor');

    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      data: certificate,
      verificationUrl: 'http://localhost:5000/api/certificates/verify/' + hash
    });

  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating certificate',
      error: error.message
    });
  }
};

// VERIFY CERTIFICATE (PUBLIC)
// Purpose: Public endpoint to verify certificate
// Endpoint: GET /api/certificates/verify/:hash
// Auth: Not required (public)
const verifyCertificate = async (req, res) => {
  try {
    const hash = req.params.hash;

    // Find certificate by hash
    const certificate = await Certificate.findOne({ hash: hash })
      .populate('studentId', 'name email')
      .populate('courseId', 'title track instructor duration');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        verified: false,
        message: 'Invalid certificate. Certificate not found.'
      });
    }

    // Check if certificate is verified
    if (!certificate.isVerified) {
      return res.status(400).json({
        success: false,
        verified: false,
        message: 'Certificate has been revoked or is invalid'
      });
    }

    res.status(200).json({
      success: true,
      verified: true,
      data: {
        studentName: certificate.studentId.name,
        studentEmail: certificate.studentId.email,
        courseTitle: certificate.courseId.title,
        courseTrack: certificate.courseId.track,
        instructor: certificate.courseId.instructor,
        issueDate: certificate.issueDate,
        certificateId: certificate.hash
      }
    });

  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      verified: false,
      message: 'Server error while verifying certificate',
      error: error.message
    });
  }
};

// GET ALL CERTIFICATES FOR STUDENT
// Purpose: Get all certificates for logged-in student
// Endpoint: GET /api/certificates/me
// Auth: Required
const getMyCertificates = async (req, res) => {
  try {
    const studentId = req.student._id;

    const certificates = await Certificate.find({ studentId: studentId })
      .populate('courseId', 'title track instructor')
      .sort({ issueDate: -1 });

    if (!certificates || certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No certificates found'
      });
    }

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates
    });

  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certificates',
      error: error.message
    });
  }
};

// Export controllers
module.exports = {
  generateCertificate,
  verifyCertificate,
  getMyCertificates
};