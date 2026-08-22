const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import configuration
const config = require('./config/config');

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ============================================
// CORS CONFIGURATION
// ============================================

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = config.cors.allowedOrigins;
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: config.cors.allowedMethods,
  allowedHeaders: config.cors.allowedHeaders,
  credentials: config.cors.credentials,
};

app.use(cors(corsOptions));

// ============================================
// MIDDLEWARE
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'EduFlex Academy API is running!',
    environment: config.server.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', adminRoutes);

// ============================================
// 404 Handler
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found: ' + req.method + ' ' + req.originalUrl,
  });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: config.server.nodeEnv === 'development' ? err.stack : undefined,
  });
});

// ============================================
// DATABASE CONNECTION & SERVER START
// ============================================

mongoose.connect(config.database.uri)
  .then(() => {
    console.log('MongoDB Connected Successfully');

    const PORT = config.server.port;
    app.listen(PORT, () => {
      console.log('========================================');
      console.log('EduFlex Academy API Server');
      console.log('========================================');
      console.log('Environment: ' + config.server.nodeEnv);
      console.log('Port: ' + PORT);
      console.log('Health check: http://localhost:' + PORT + '/api/health');
      console.log('========================================');
      console.log('Routes loaded:');
      console.log('  POST /api/auth/register');
      console.log('  POST /api/auth/login');
      console.log('  GET /api/courses');
      console.log('  GET /api/courses/:track');
      console.log('  POST /api/enrollments');
      console.log('  GET /api/enrollments/me');
      console.log('  POST /api/certificates');
      console.log('  GET /api/certificates/verify/:hash');
      console.log('  GET /api/admin/enrollments');
      console.log('  PATCH /api/admin/enrollments/:id');
      console.log('========================================');
      console.log('CORS allowed origins:');
      config.cors.allowedOrigins.forEach(origin => {
        console.log('  - ' + origin);
      });
      console.log('========================================');
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

module.exports = app;