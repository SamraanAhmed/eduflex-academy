import React from 'react';

const AdminPage = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4a154b, #2e0830)', borderLeft: '4px solid #a855f7', padding: '20px', borderRadius: '8px', marginBottom: '30px', color: '#fff' }}>
        <h1 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>🔑 Admin Enrollment & Certificate Management Panel</h1>
        <p style={{ color: '#e9d5ff', margin: 0 }}>Assigned Developer: <strong>Sara Hussain (Full Stack Lead)</strong></p>
        <p style={{ color: '#c084fc', fontSize: '14px', marginTop: '5px' }}>
          Directory: <code>frontend/src/pages/admin/</code>
        </p>
      </div>

      <h2 style={{ color: '#4a154b' }}>Track Sub-pages & Featured Courses:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>1. Student Registrations</h3>
          <p style={{ color: '#555' }}>Comprehensive hands-on training module for Student Registrations. Includes interactive lab projects and certification preparation.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>2. Course Database Schema</h3>
          <p style={{ color: '#555' }}>Professional skill-building course covering Course Database Schema. Designed for beginners and intermediate learners.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>3. Certificate Verification Endpoint</h3>
          <p style={{ color: '#555' }}>Advanced career bootcamp module for Certificate Verification Endpoint with real-world industry portfolio projects.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
