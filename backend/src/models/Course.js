// Import mongoose for database modeling
const mongoose = require('mongoose');

// Define the Course schema - this stores all course information
const CourseSchema = new mongoose.Schema({
  
  // Course title - required field
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  // Course description - optional but recommended
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  
  // Course track/category - determines which pillar the course belongs to
  track: {
    type: String,
    required: [true, 'Please add a track'],
    enum: ['fullstack', 'datascience', 'cybersecurity', 'uiux'], // Only these tracks are allowed
    trim: true
  },
  
  // Name of the instructor teaching this course
  instructor: {
    type: String,
    required: [true, 'Please add an instructor name'],
    trim: true
  },
  
  // Course duration in weeks
  duration: {
    type: String,
    required: [true, 'Please add course duration'],
    trim: true
  },
  
  // Course price - 0 means free course
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0, // Default is free
    min: [0, 'Price cannot be negative']
  },
  
  // URL to course thumbnail image
  thumbnail: {
    type: String,
    default: 'default-course.jpg'
  },
  
  // Course creation timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Course model
module.exports = mongoose.model('Course', CourseSchema);
