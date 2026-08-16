const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  track: { 
    type: String, 
    required: true,
    enum: ['web-development', 'data-science-ai', 'cybersecurity', 'uiux-design']
  },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
  instructor: { type: String, required: true },
  level: { type: String, default: 'Beginner to Advanced' },
  isPublished: { type: Boolean, default: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
