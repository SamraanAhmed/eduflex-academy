// Import mongoose for database modeling
const mongoose = require('mongoose');

// Define the Enrollment schema - this tracks which student is enrolled in which course
const EnrollmentSchema = new mongoose.Schema({
  
  // Reference to the Student model - which student is enrolled
  studentId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'Student', // This references the Student model
    required: [true, 'Student ID is required']
  },
  
  // Reference to the Course model - which course they enrolled in
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // This references the Course model
    required: [true, 'Course ID is required']
  },
  
  // Enrollment status - tracks the progress of the student in the course
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'], // Only these three statuses allowed
    default: 'active' // When first enrolled, status is active
  },
  
  // Progress percentage - how much of the course is completed
  progress: {
    type: Number,
    default: 0, // Starts at 0%
    min: [0, 'Progress cannot be less than 0'],
    max: [100, 'Progress cannot exceed 100']
  },
  
  // Date when the student enrolled in the course
  enrolledAt: {
    type: Date,
    default: Date.now // Auto-set to current date/time
  }
});

// Create and export the Enrollment model
module.exports = mongoose.model('Enrollment', EnrollmentSchema);