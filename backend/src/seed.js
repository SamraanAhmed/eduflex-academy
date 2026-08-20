// Import mongoose for database connection and models
const mongoose = require('mongoose');
// Import dotenv to load environment variables from .env file
const dotenv = require('dotenv');

// Import all the model schemas we created
// These represent the structure of our database collections
const Student = require('./models/Student');
const Course = require('./models/Course');
const Enrollment = require('./models/Enrollment');
const Certificate = require('./models/Certificate');

// Load environment variables from .env file into process.env
// This gives us access to MONGODB_URI and other secrets
dotenv.config();

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
    title: 'MERN Stack Bootcamp Pakistan', // Course name
    description: 'Complete full-stack web development with MongoDB, Express, React, and Node.js. Build real-world projects from scratch.', // Detailed description
    track: 'fullstack', // Course category - must match enum in Course schema
    instructor: 'Full Stack Instructor', // Instructor name
    duration: '8 weeks', // Course duration
    price: 0, // Free course (0 = free)
    thumbnail: 'https://via.placeholder.com/300x200/4A90D9/FFFFFF?text=MERN+Stack' // Image URL
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
// This creates one test student in the database
const students = [
  {
    name: 'Test Student', // Student's full name
    email: 'test@student.com', // Unique email for login
    password: 'password123', // Plain password (will be hashed in real app)
    role: 'student', // User role: student, instructor, or admin
    profilePicture: 'default.jpg' // Default profile image
  }
];

// Function to clear existing data and seed new data
// This runs the entire seeding process
const seedDatabase = async () => {
  try {
    // STEP 1: Clear all existing data from collections
    // This ensures we start with a clean database
    console.log('Clearing existing data...');
    await Student.deleteMany({}); // Delete all students
    await Course.deleteMany({}); // Delete all courses
    await Enrollment.deleteMany({}); // Delete all enrollments
    await Certificate.deleteMany({}); // Delete all certificates
    console.log('Data cleared successfully');

    // STEP 2: Insert all courses into the database
    // This adds the 12 sample courses
    console.log('Inserting courses...');
    const insertedCourses = await Course.insertMany(courses);
    console.log('Inserted ' + insertedCourses.length + ' courses');

    // STEP 3: Insert students into the database
    // This adds the test student
    console.log('Inserting students...');
    const insertedStudents = await Student.insertMany(students);
    console.log('Inserted ' + insertedStudents.length + ' students');

    // STEP 4: Create sample enrollments
    // This enrolls the test student in courses
    console.log('Creating sample enrollments...');
    const studentId = insertedStudents[0]._id; // Get the ID of the first student
    
    // Enroll student in first 3 courses (active status with random progress)
    for (let i = 0; i < 3; i++) {
      const enrollment = new Enrollment({
        studentId: studentId, // Reference to student
        courseId: insertedCourses[i]._id, // Reference to course
        status: 'active', // Enrollment status
        progress: Math.floor(Math.random() * 100) // Random progress 0-99%
      });
      await enrollment.save(); // Save to database
    }
    console.log('Sample enrollments created');

    // STEP 5: Create sample certificates
    // This creates one completed enrollment and a certificate
    console.log('Creating sample certificates...');
    
    // Create a completed enrollment (progress 100%)
    const completedEnrollment = new Enrollment({
      studentId: studentId,
      courseId: insertedCourses[3]._id, // Python course (index 3)
      status: 'completed', // Status = completed
      progress: 100 // 100% complete
    });
    await completedEnrollment.save();

    // Create certificate for the completed course
    // Each certificate gets a unique hash for verification
    const certificate = new Certificate({
      studentId: studentId, // Who earned it
      courseId: insertedCourses[3]._id, // Which course
      hash: 'CERT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase(), // Unique verification code
      issueDate: new Date(), // When it was issued
      isVerified: true // Certificate is valid
    });
    await certificate.save();
    console.log('Sample certificate created');

    // STEP 6: Print summary of what was added
    console.log('\n========================================');
    console.log('Database Seeding Complete!');
    console.log('========================================');
    console.log('Summary:');
    console.log('   - ' + insertedStudents.length + ' student(s) added');
    console.log('   - ' + insertedCourses.length + ' courses added');
    console.log('   - 4 sample enrollments created');
    console.log('   - 1 sample certificate created');
    console.log('========================================');
    
    // STEP 7: Disconnect from database
    // Clean up the connection
    await mongoose.disconnect();
    console.log('Database disconnected');

  } catch (error) {
    // If any error occurs, log it and exit
    console.error('Seeding error:', error);
    await mongoose.disconnect();
    process.exit(1); // Exit with error code
  }
};

// Run the seed function
// This starts the entire seeding process
seedDatabase();