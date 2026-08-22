// ADMIN AUTHENTICATION MIDDLEWARE
// Purpose: Only allow admin users to access admin routes
// Process: Check if user is authenticated → Check if role is 'admin'
const adminAuth = (req, res, next) => {
  try {
    // Check if user is authenticated first (from protect middleware)
    if (!req.student) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please log in.'
      });
    }

    // Check if user role is admin
    if (req.student.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // User is admin, continue to next middleware/controller
    next();

  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin authentication',
      error: error.message
    });
  }
};

module.exports = { adminAuth };