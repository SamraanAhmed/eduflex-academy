import React from 'react';

const HeroSection = ({ icon, title, subtitle, meta }) => {
  return (
    <div
    className="wd-page"
    style={{
        background: 'linear-gradient(135deg, #4a154b, #2e0830)',
        borderLeft: '4px solid #a855f7',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        color: '#fff',
      }}
    >
      <h1 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>
        {icon} {title}
      </h1>
      {subtitle && <p style={{ color: '#e9d5ff', margin: 0 }}>{subtitle}</p>}
      {meta && (
        <p style={{ color: '#c084fc', fontSize: '14px', marginTop: '5px' }}>{meta}</p>
      )}
    </div>
  );
};

export default HeroSection;