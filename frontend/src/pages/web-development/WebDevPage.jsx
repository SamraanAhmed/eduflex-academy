import React from 'react';
import { Link } from 'react-router-dom';
import './webdev-styles.css';
import SEO from './SEO';
const TRACK_COURSES=[
  {
  slug:'mern-bootcamp',
  title:'MERN Stack Bootcamp Pakistan',
summary:'Comprehensive hands-on training covering MongoDB, Express, React, and Node.js. Includes interactive lab projects and certification preparation.',
duration:'4 Months',
fees:'PKR 55,000'
},
 {
  slug:'react-masterclass',
  title:'React Masterclass',
summary: 'Deep dive into modern React: hooks, component architecture, state management, and routing Designed for beginners and intermediate learners.',
duration:'3 Months',
fees:'PKR 35,000'
},
 {
  slug:'node-api-course',
  title:'Node.js Api Architecture Course',
summary:'Advanced backend module on building and securing REST APIs with Node.js and Express, with real-world portfolio projects.',
duration:'2 Months',
fees:'PKR 30,000'
},
];
const CURRICULUM_MODULES = [
  { title: 'Foundations', detail: 'HTML5, CSS3, JavaScript (ES6+), Git & GitHub version control' },
  { title: 'Frontend Development', detail: 'React.js, component architecture, hooks, state management, React Router' },
  { title: 'Backend Development', detail: 'Node.js, Express.js, REST API design, middleware, authentication (JWT)' },
  { title: 'Database', detail: 'MongoDB — schema design, Mongoose, aggregation pipelines, indexing' },
  { title: 'Full-Stack Integration', detail: 'Connecting frontend to backend, deployment, environment configuration' },
  { title: 'Capstone Project', detail: 'Build and deploy a complete MERN application for your portfolio' },
];

const CAREER_ROLES = [
  { role: 'Junior MERN Developer', range: 'PKR 60,000 – 100,000 /month' },
  { role: 'Full-Stack Developer', range: 'PKR 100,000 – 180,000 /month' },
  { role: 'Backend Developer (Node.js)', range: 'PKR 90,000 – 160,000 /month' },
  { role: 'Frontend Developer (React)', range: 'PKR 80,000 – 150,000 /month' },
];

const cardStyle={
  backgroundColor: '#fff',
  border: '1px solid #e9d5ff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
};
const buttonStyle={
    backgroundColor: '#4a154b',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  boxSizing: 'border-box',
};

const sectionHeadingStyle = {
  color: '#4a154b',
  marginTop: '32px',
};

const WebdevPage=()=>{
  return(
    <div
      className="wd-page"
      style={{ padding: '40px', margin: 'auto', maxWidth: '1100px', fontFamily: 'sans-serif' }}
    >
      <SEO
  title="Full-Stack Web Development Track | EduFlex Academy"
  description="Learn MERN stack development with EduFlex Academy — MERN Bootcamp, React Masterclass, and Node.js API Architecture courses in Pakistan."
  url= "https://your-domain-here.com/web-development"  />
      <div
        style={{
          background: 'linear-gradient(135deg, #4a154b, #2e0830)',
          borderLeft: '4px solid #a855f7',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          color: '#fff',
        }}
      >
        <h1 className="wd-hero" style={{ color: '#fff', margin: '10px' }}>Full-Stack Web Development</h1>
        <p style={{ color: '#e9d5ff', margin: 0 }}>Assigned developer:<strong>Shanzil Iftikhar(Full Stack)</strong></p>
      </div>
      <h2 className="wd-section-heading" style={sectionHeadingStyle}>📚 Curriculum Overview</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        This track takes you from web fundamentals to a fully deployed full-stack application,
        covering every layer of the MERN stack.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {CURRICULUM_MODULES.map((mod) => (
          <div
            key={mod.title}
            className="wd-tile"
            style={{
              backgroundColor: '#f9f5ff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
               padding: '16px',
            }}
          >
            <h4 style={{ color: '#4a154b', margin: '0 0 6px 0' }}>{mod.title}</h4>
            <p style={{ color: '#555', margin: 0, fontSize: '14px' }}>{mod.detail}</p>
          </div>
        ))}
      </div>
      <h2 className="wd-section-heading" style={sectionHeadingStyle}>💼 Career Outcomes & Salary Ranges</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Roles graduates of this track commonly pursue. Figures are approximate industry
        estimates for the Pakistani job market and vary by experience, company, and location.
      </p>
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e9d5ff',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {CAREER_ROLES.map((item, i) => (
          <div
            key={item.role}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: i < CAREER_ROLES.length - 1 ? '1px solid #f3e8ff' : 'none',
            }}
          >
            <span style={{ color: '#4a154b', fontWeight: 'bold' }}>{item.role}</span>
            <span style={{ color: '#6b21a8' }}>{item.range}</span>
          </div>
        ))}
      </div>

      {/* ---------- COURSE CARDS ---------- */}
      <h2 style={sectionHeadingStyle}>🎓 Track Sub-pages & Featured Courses</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {TRACK_COURSES.map((course) => (
          <div key={course.slug} style={cardStyle}>
            <h3 style={{ color: '#4a154b', marginTop: 0 }}>{course.title}</h3>
            <p style={{ color: '#555', flex: 1 }}>{course.summary}</p>

            <div
              className="wd-card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                margin: '10px 0 16px 0',
                fontSize: '13px',
                color: '#6b21a8',
              }}
            >
              <span style={{ background: '#f3e8ff', padding: '3px 8px', borderRadius: '4px' }}>
                ⏱ {course.duration}
              </span>
              <span style={{ background: '#f3e8ff', padding: '3px 8px', borderRadius: '4px' }}>
                💳 {course.fees}
              </span>
            </div>

            <Link to={`/web-development/${course.slug}`} className="wd-btn-primary" style={buttonStyle}>
              Explore Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WebdevPage;