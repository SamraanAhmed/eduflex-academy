import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnrollmentForm from './EnrollmentForm';
import HeroSection from './HeroSection';

const SYLLABUS = [
  {
    module: 'Module 1: JavaScript & Web Foundations',
    topics: ['ES6+ syntax, async/await, promises', 'DOM manipulation & fetch API', 'Git & GitHub workflow'],
  },
  {
    module: 'Module 2: MongoDB',
    topics: ['Schema design & data modeling', 'CRUD operations & queries', 'Aggregation pipelines & indexing'],
  },
  {
    module: 'Module 3: Express.js',
    topics: ['REST API design principles', 'Middleware & error handling', 'JWT authentication & authorization'],
  },
  {
    module: 'Module 4: React.js',
    topics: ['Components, props & JSX', 'Hooks (useState, useEffect, useContext)', 'React Router & client-side navigation'],
  },
   {
    module: 'Module 5: Node.js & Deployment',
    topics: ['Server-side architecture & event loop', 'Environment configuration', 'Deployment to production'],
  },
];
const PROJECTS = [
  {
    title: 'Task Management App',
    description: 'A full CRUD app with user authentication, built to practice MongoDB schema design and Express REST APIs.',
  },
  {
    title: 'E-Commerce Fashion Store',
    description: 'Product listings, cart functionality, and checkout flow — practicing React state management and API integration.',
  },
  {
    title: 'Currency converter',
    description: 'A complete, currency converter — portfolio-ready by the end of the bootcamp.',
  },
];
const MernBootcamp=()=>{
  const [showForm, setShowForm] = useState(false);

    return (
        <div style={{padding:'40px',margin:'auto',maxWidth:'900px',fontFamily:'sans-serif'}}>
            <Link to="/web-development" style={{color:'#4a154b',textDecoration:'none',padding:'14px'}}>
            Back to Web Development Track
            </Link>
             <div
        style={{
          background: 'linear-gradient(135deg, #4a154b, #2e0830)',
          borderLeft: '4px solid #a855f7',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0 30px 0',
          color: '#fff',
        }}
      >
       <h1 style={{color:'blue',margin:'10px'}} >MERN Stack Bootcamp Pakistan</h1>
       <p style={{color:'white',margin:'0'}}>
        Full-stack development with MongoDB, Express, React, and Node.js
       </p>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
         <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          ⏱ Duration: 4 Months
        </span>
         <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          ⏱ Fee: PKR 55,000
        </span>
         <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          Level: Beginner to Advanced
        </span>
      </div>
      <h2 style={{color:'#4a154b'}}>
        About this Course
      </h2>
      <p style={{color:'#555',lineHeight:'1.6'}}>
This bootcamp takes you from zero to job-ready full-stack developer using the MERN stack.
        You'll build real applications end to end — from database schema design through to a
        deployed, working product — with hands-on labs and a capstone project for your portfolio
      </p>
       <h2 style={{ color: '#4a154b', marginTop: '40px' }}>📖 Syllabus Breakdown</h2>
      {SYLLABUS.map((section) => (
        <div
          key={section.module}
          style={{
            backgroundColor: '#f9f5ff',
            border: '1px solid #e9d5ff',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '12px',
          }}
        >
          <h4 style={{ color: '#4a154b', margin: '0 0 8px 0' }}>{section.module}</h4>
          <ul style={{ color: '#555', margin: 0, paddingLeft: '20px', lineHeight: 1.7 }}>
            {section.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
 <h2 style={{ color: '#4a154b', marginTop: '40px' }}>🛠 Hands-On Projects</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.title}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
              >
            <h4 style={{ color: '#4a154b', margin: '0 0 8px 0' }}>{project.title}</h4>
            <p style={{ color: '#555', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
 
      <button onClick={() => setShowForm(true)}
      style={{backgroundColor: '#4a154b',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px',
        }}>
          Enroll Now
          </button>
           {showForm && (
        <EnrollmentForm
          courseTitle="MernBootcamp course"
          onClose={() => setShowForm(false)}
        />
             )};
      </div>
    );
};
export default MernBootcamp;