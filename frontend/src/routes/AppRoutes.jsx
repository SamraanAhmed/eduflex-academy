import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Login Page
import Login from '../pages/Login';

// Track Pages
import WebDevPage from '../pages/web-development/WebDevPage';
import DataSciencePage from '../pages/data-science-ai/DataSciencePage';
import CybersecurityPage from '../pages/cybersecurity/CybersecurityPage';
import UiUxPage from '../pages/uiux-design/UiUxPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminEnrollments from '../pages/admin/AdminEnrollments';
import AdminCourses from '../pages/admin/AdminCourses';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Default Route */}
      <Route path="/" element={<WebDevPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/enrollments" element={<AdminEnrollments />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      
      {/* Track Pages */}
      <Route path="/web-development" element={<WebDevPage />} />
      <Route path="/data-science-ai" element={<DataSciencePage />} />
      <Route path="/cybersecurity" element={<CybersecurityPage />} />
      <Route path="/uiux-design" element={<UiUxPage />} />
    </Routes>
  );
};

export default AppRoutes;