import React from 'react';

const UiUxPage = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4a154b, #2e0830)', borderLeft: '4px solid #a855f7', padding: '20px', borderRadius: '8px', marginBottom: '30px', color: '#fff' }}>
        <h1 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>🎨 UI/UX & Graphic Design Track</h1>
        <p style={{ color: '#e9d5ff', margin: 0 }}>Assigned Developer: <strong>Hijab Zahra (Frontend)</strong></p>
        <p style={{ color: '#c084fc', fontSize: '14px', marginTop: '5px' }}>
          Directory: <code>frontend/src/pages/uiux-design/</code>
        </p>
      </div>

      <h2 style={{ color: '#4a154b' }}>Track Sub-pages & Featured Courses:</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>1. Figma UI/UX Fundamentals & Prototyping</h3>
          <p style={{ color: '#555' }}>Comprehensive hands-on training module for Figma UI/UX Fundamentals & Prototyping. Includes interactive lab projects and certification preparation.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>2. Brand Identity & Visual Design Course</h3>
          <p style={{ color: '#555' }}>Professional skill-building course covering Brand Identity & Visual Design Course. Designed for beginners and intermediate learners.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e9d5ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#4a154b' }}>3. Product Design Career Track</h3>
          <p style={{ color: '#555' }}>Advanced career bootcamp module for Product Design Career Track with real-world industry portfolio projects.</p>
          <button style={{ backgroundColor: '#4a154b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Explore Course</button>
        </div>

      </div>
    </div>
  );
};

export default UiUxPage;
