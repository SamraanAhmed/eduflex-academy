// Import mongoose for database modeling
const mongoose = require('mongoose');

// Define the Student schema - this is like a blueprint for student documents in MongoDB
const StudentSchema = new mongoose.Schema({
  
  // Student's full name - required field
  name: {
    type: String,
    required: [true, 'Please add a name'], // Error message if missing
    trim: true, // Remove extra spaces
    maxlength: [50, 'Name cannot be more than 50 characters'] // Validation
  },
  
  // Student's email address - must be unique and valid format
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true, // No two students can have same email
    trim: true,
    lowercase: true, // Convert email to lowercase automatically
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // Regular expression for email validation
      'Please add a valid email'
    ]
  },
  
  // Student's password - minimum 6 characters, hidden in queries
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // When we query students, password won't be returned by default
  },
  
  // User role - determines permissions in the system
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'], // Only these values are allowed
    default: 'student' // If not specified, user is a student
  },
  
  // Profile picture filename - optional field
  profilePicture: {
    type: String,
    default: 'default.jpg' // Default image if none provided
  },
  
  // Account creation timestamp - automatically set to current time
  createdAt: {
    type: Date,
    default: Date.now // When a new student is created, this field gets the current date/time
  }
});

// Create and export the Student model - this allows us to interact with the 'students' collection in MongoDB
module.exports = mongoose.model('Student', StudentSchema);