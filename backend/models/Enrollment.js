const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentPhone: { type: String, required: true },
  track: { type: String, required: true },     // e.g. cybersecurity, web-development
  courseName: { type: String, required: true }, // e.g. ethical-hacking, mern-bootcamp
  status: { type: String, default: 'Pending', enum: ['Pending', 'Enrolled', 'Completed', 'Cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
