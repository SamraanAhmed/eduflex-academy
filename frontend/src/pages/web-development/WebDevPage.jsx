import React from 'react';

const WebDevPage = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4a154b, #2e0830)', borderLeft: '4px solid #a855f7', padding: '20px', borderRadius: '8px', marginBottom: '30px', color: '#fff' }}>
        <h1 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>💻 Full-Stack Web Development Track</h1>
        <p style={{ color: '#e9d5ff', margin: 0 }}>Assigned Developer: <strong>Shanzil Iftikhar (Full Stack Lead)</strong></p>
        <p style={{ color: '#c084fc', fontSize: '14px', marginTop: '5px' }}>
          Directory: <code>frontend/src/pages/web-development/</code>
        </p>
      </div>

      <h2 style={{ color: '#4a154b' }}>Track Sub-pages & Featured Courses:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>1. MERN Stack Bootcamp Pakistan</h3>
          <p style={{ color: '#555' }}>Comprehensive hands-on training module for MERN Stack Bootcamp Pakistan. Includes interactive lab projects and certification preparation.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>2. Frontend React & Tailwind Course</h3>
          <p style={{ color: '#555' }}>Professional skill-building course covering Frontend React & Tailwind Course. Designed for beginners and intermediate learners.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>3. Node.js API Architecture Course</h3>
          <p style={{ color: '#555' }}>Advanced career bootcamp module for Node.js API Architecture Course with real-world industry portfolio projects.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

      </div>
    </div>
  );
};

export default WebDevPage;
