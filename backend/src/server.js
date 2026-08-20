const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduFlex Academy MERN Backend API Server Running' });
});

// Sample Courses Endpoint
app.get('/api/courses', (req, res) => {
  res.json([
    { id: 1, title: 'Ethical Hacking & Pen Testing', track: 'cybersecurity', fee: 'PKR 45,000', duration: '3 Months' },
    { id: 2, title: 'Full-Stack MERN Bootcamp', track: 'web-development', fee: 'PKR 55,000', duration: '4 Months' },
    { id: 3, title: 'Python for Data Science & AI', track: 'data-science-ai', fee: 'PKR 50,000', duration: '3 Months' },
    { id: 4, title: 'Figma UI/UX & Product Design', track: 'uiux-design', fee: 'PKR 35,000', duration: '2 Months' }
  ]);
});

// Sample Enrollment Submission Endpoint (For Sara Hussain's Backend System)
app.post('/api/enrollments', (req, res) => {
  const { studentName, studentEmail, track, courseName } = req.body;
  console.log(`[Enrollment Received]: ${studentName} for ${track} -> ${courseName}`);
  res.status(201).json({
    success: true,
    message: 'Enrollment inquiry received successfully. An EduFlex representative will contact you.',
    data: req.body
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[EduFlex Server]: Running on port ${PORT}`);
});
