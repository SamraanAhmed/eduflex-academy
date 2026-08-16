import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#4a154b', borderBottom: '3px solid #a855f7', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🎓</span>
        <Link to="/" style={{ color: '#ffffff', fontSize: '22px', fontWeight: 'bold', textDecoration: 'none' }}>
          EduFlex <span style={{ color: '#d8b4fe' }}>Academy</span>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '18px' }}>
        <Link to="/web-development" style={{ color: '#f3e8ff', textDecoration: 'none', fontWeight: '500' }}>💻 Web Dev (Shanzil)</Link>
        <Link to="/data-science-ai" style={{ color: '#f3e8ff', textDecoration: 'none', fontWeight: '500' }}>📊 Data Science (Areeba)</Link>
        <Link to="/cybersecurity" style={{ color: '#f3e8ff', textDecoration: 'none', fontWeight: '500' }}>🛡️ Cybersecurity (Samia)</Link>
        <Link to="/uiux-design" style={{ color: '#f3e8ff', textDecoration: 'none', fontWeight: '500' }}>🎨 UI/UX (Hijab)</Link>
        <Link to="/admin" style={{ color: '#f3e8ff', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #d8b4fe', padding: '4px 10px', borderRadius: '4px' }}>🔑 Admin (Sara)</Link>
      </div>
    </nav>
  );
};

export default Navbar;
