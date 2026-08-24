import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    activeEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const enrollmentsRes = await apiClient.adminGetAllEnrollments();
      const enrollments = enrollmentsRes.data || [];
      const coursesRes = await apiClient.adminGetAllCourses();
      const courses = coursesRes.data || [];
      
      const students = enrollments.map(e => e.studentId?._id);
      const uniqueStudents = [...new Set(students)];
      const activeEnrollments = enrollments.filter(e => e.status === 'active');

      setStats({
        totalStudents: uniqueStudents.length,
        totalCourses: courses.length,
        totalEnrollments: enrollments.length,
        activeEnrollments: activeEnrollments.length,
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard stats');
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Dashboard...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <p>{error}</p>
        <button onClick={fetchStats} style={{ padding: '10px 20px', cursor: 'pointer' }}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>Admin Dashboard</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#1565c0' }}>Total Students</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{stats.totalStudents}</p>
        </div>
        <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#2e7d32' }}>Total Courses</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{stats.totalCourses}</p>
        </div>
        <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#e65100' }}>Total Enrollments</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{stats.totalEnrollments}</p>
        </div>
        <div style={{ background: '#e0f7fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#00695c' }}>Active Enrollments</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{stats.activeEnrollments}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => window.location.href = '/admin/enrollments'}
          style={{
            padding: '12px 24px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          View All Enrollments
        </button>
        <button
          onClick={() => window.location.href = '/admin/courses'}
          style={{
            padding: '12px 24px',
            background: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Manage Courses
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;