// Load environment variables FIRST - before anything else
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Import mongoose for database connection and models
const mongoose = require('mongoose');

// Import all the model schemas we created
// These represent the structure of our database collections
const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Certificate = require('./models/Certificate');

// Connect to MongoDB using the connection string from .env
// If MONGODB_URI is not set, fallback to local MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduflex')
  .then(() => console.log('MongoDB Connected for Seeding')) // Success message
  .catch(err => console.error('MongoDB Connection Error:', err)); // Error message

// Sample courses data - one for each track
// Each course matches the Course schema structure
const courses = [
  // ============================================
  // FULL STACK TRACK - 3 courses
  // ============================================
  {
    title: 'MERN Stack Bootcamp Pakistan',
    description: 'Complete full-stack web development with MongoDB, Express, React, and Node.js. Build real-world projects from scratch.',
    track: 'fullstack',
    instructor: 'Full Stack Instructor',
    duration: '8 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/4A90D9/FFFFFF?text=MERN+Stack'
  },
  {
    title: 'Frontend React & Tailwind Course',
    description: 'Master modern frontend development with React.js and Tailwind CSS. Build responsive and interactive user interfaces.',
    track: 'fullstack',
    instructor: 'Full Stack Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/6C63FF/FFFFFF?text=React+Tailwind'
  },
  {
    title: 'Node.js API Architecture Course',
    description: 'Learn to build scalable REST APIs with Node.js, Express, and MongoDB. Master authentication, middleware, and error handling.',
    track: 'fullstack',
    instructor: 'Full Stack Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Node.js+API'
  },

  // ============================================
  // DATA SCIENCE TRACK - 3 courses
  // ============================================
  {
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python. Learn fundamentals, data structures, and problem-solving skills.',
    track: 'datascience',
    instructor: 'Data Science Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Python'
  },
  {
    title: 'Data Science Training Islamabad',
    description: 'Comprehensive data science training covering statistics, data analysis, visualization, and machine learning fundamentals.',
    track: 'datascience',
    instructor: 'Data Science Instructor',
    duration: '10 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Data+Science'
  },
  {
    title: 'Machine Learning & AI Bootcamp',
    description: 'Dive into machine learning algorithms, neural networks, and artificial intelligence. Hands-on projects with real datasets.',
    track: 'datascience',
    instructor: 'Data Science Instructor',
    duration: '8 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=ML+AI'
  },

  // ============================================
  // CYBERSECURITY TRACK - 3 courses
  // ============================================
  {
    title: 'Ethical Hacking Course',
    description: 'Learn ethical hacking techniques, penetration testing, and security assessment. Understand how to protect systems from cyber threats.',
    track: 'cybersecurity',
    instructor: 'Cybersecurity Instructor',
    duration: '8 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/2C3E50/FFFFFF?text=Ethical+Hacking'
  },
  {
    title: 'Network Security Certification',
    description: 'Master network security concepts, firewalls, encryption, and secure network architecture design.',
    track: 'cybersecurity',
    instructor: 'Cybersecurity Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/34495E/FFFFFF?text=Network+Security'
  },
  {
    title: 'Corporate Cybersecurity Training',
    description: 'Enterprise-level cybersecurity training covering risk management, compliance, and security best practices for organizations.',
    track: 'cybersecurity',
    instructor: 'Cybersecurity Instructor',
    duration: '8 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/1A5276/FFFFFF?text=Corporate+Security'
  },

  // ============================================
  // UI/UX TRACK - 3 courses
  // ============================================
  {
    title: 'Figma UI/UX Fundamentals',
    description: 'Learn UI/UX design fundamentals with Figma. Master design principles, prototyping, and user research.',
    track: 'uiux',
    instructor: 'UI/UX Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/A29BFE/FFFFFF?text=Figma+UIUX'
  },
  {
    title: 'Brand Identity Design',
    description: 'Create powerful brand identities. Learn logo design, color theory, typography, and brand strategy.',
    track: 'uiux',
    instructor: 'UI/UX Instructor',
    duration: '6 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/FDCB6E/FFFFFF?text=Brand+Design'
  },
  {
    title: 'Product Design Career Track',
    description: 'Launch your product design career. Learn design thinking, user flows, wireframing, and high-fidelity prototyping.',
    track: 'uiux',
    instructor: 'UI/UX Instructor',
    duration: '10 weeks',
    price: 0,
    thumbnail: 'https://via.placeholder.com/300x200/E17055/FFFFFF?text=Product+Design'
  }
];

// Sample student for testing
const students = [
  {
    name: 'Test Student',
    email: 'test@student.com',
    password: 'password123',
    role: 'student',
    profilePicture: 'default.jpg'
  }
];

// Function to clear existing data and seed new data
const seedDatabase = async () => {
  try {
    console.log('Clearing existing data...');
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    await Certificate.deleteMany({});
    console.log('Data cleared successfully');

    console.log('Inserting courses...');
    const insertedCourses = await Course.insertMany(courses);
    console.log('Inserted ' + insertedCourses.length + ' courses');

    console.log('Inserting students...');
    const insertedStudents = await Student.insertMany(students);
    console.log('Inserted ' + insertedStudents.length + ' students');

    console.log('Creating sample enrollments...');
    const studentId = insertedStudents[0]._id;
    
    for (let i = 0; i < 3; i++) {
      const enrollment = new Enrollment({
        studentId: studentId,
        courseId: insertedCourses[i]._id,
        status: 'active',
        progress: Math.floor(Math.random() * 100)
      });
      await enrollment.save();
    }
    console.log('Sample enrollments created');

    console.log('Creating sample certificates...');
    const completedEnrollment = new Enrollment({
      studentId: studentId,
      courseId: insertedCourses[3]._id,
      status: 'completed',
      progress: 100
    });
    await completedEnrollment.save();

    const certificate = new Certificate({
      studentId: studentId,
      courseId: insertedCourses[3]._id,
      hash: 'CERT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      issueDate: new Date(),
      isVerified: true
    });
    await certificate.save();
    console.log('Sample certificate created');

    console.log('\n========================================');
    console.log('Database Seeding Complete!');
    console.log('========================================');
    console.log('Summary:');
    console.log('   - ' + insertedStudents.length + ' student(s) added');
    console.log('   - ' + insertedCourses.length + ' courses added');
    console.log('   - 4 sample enrollments created');
    console.log('   - 1 sample certificate created');
    console.log('========================================');
    
    await mongoose.disconnect();
    console.log('Database disconnected');

  } catch (error) {
    console.error('Seeding error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();