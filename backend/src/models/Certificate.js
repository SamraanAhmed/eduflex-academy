// Import mongoose for database modeling
const mongoose = require('mongoose');

// Define the Certificate schema - this stores certificates issued to students who complete courses
const CertificateSchema = new mongoose.Schema({
  
  // Reference to the Student model - which student received this certificate
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'Student', // This references the Student model
    required: [true, 'Student ID is required']
  },
  
  // Reference to the Course model - which course they completed
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // This references the Course model
    required: [true, 'Course ID is required']
  },
  
  // Unique certificate hash - this is the verification code students share
  // Example: CERT-ABC123XYZ789 - used to verify certificate is genuine
  hash: {
    type: String,
    required: [true, 'Certificate hash is required'],
    unique: true // No two certificates can have the same hash
  },
  
  // Date when the certificate was issued
  issueDate: {
    type: Date,
    default: Date.now // Auto-set to current date/time
  },
  
  // Verification status - is this certificate valid?
  isVerified: {
    type: Boolean,
    default: true // By default, certificates are verified and valid
  }
});

// Create and export the Certificate model
module.exports = mongoose.model('Certificate', CertificateSchema);