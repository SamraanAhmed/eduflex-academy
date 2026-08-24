import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnrollmentForm from './EnrollmentForm';
import './webdev-styles.css';

const CODE_SNIPPETS = [
  {
    title: 'useState — Basic Counter',
    code: `const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>`,
  },
  {
    title: 'useEffect — Fetching Data',
    code: `useEffect(() => {
  fetch('/api/courses')
    .then(res => res.json())
    .then(data => setCourses(data));
}, []);`,
  },
  {
    title: 'Custom Hook — useLocalStorage',
    code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initial
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`,
  },
];

const INSTRUCTORS = [
  {
    name: 'Sidra Malik',
    title: 'Senior Frontend Engineer, 5+ years React experience',
    bio: 'Previously built production React apps for fintech and e-commerce platforms. Passionate about teaching clean component architecture.',
  },
  {
    name: 'Ahmed Khan',
    title: 'Full-Stack Developer & React Trainer',
    bio: 'Specializes in performance optimization and state management patterns. Has trained 500+ students in React fundamentals.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sana Saqib',
    role: 'Bootcamp Graduate, now Frontend Developer',
    quote: 'The hooks module finally made React click for me. I went from confused to confident in weeks.',
  },
  {
    name: 'Usman Ali',
    role: 'Bootcamp Graduate, now Full-Stack Developer',
    quote: 'The custom hooks section alone was worth the course. I use useLocalStorage in every project now.',
  },
];

const ReactMasterclass = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="wd-page" style={{ padding: '40px', margin: 'auto', maxWidth: '900px', fontFamily: 'sans-serif' }}>
      <Link
        to="/web-development"
        className="wd-nav-link"
        style={{ color: '#4a154b', textDecoration: 'none', padding: '14px' }}
      >
        Back to Web Development Track
      </Link>

      <div
        className="wd-hero"
        style={{
          background: 'linear-gradient(135deg, #4a154b, #2e0830)',
          borderLeft: '4px solid #a855f7',
          padding: '20px',
          borderRadius: '8px',
          margin: '20px 0 30px 0',
          color: '#fff',
        }}
      >
        <h1 style={{ color: '#d8b4fe', margin: '10px' }}>React Masterclass</h1>
        <p style={{ color: 'white', margin: '0' }}>
          Modern React development — hooks, architecture, and production patterns
        </p>
      </div>

      <div className="wd-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          ⏱ Duration: 3 Months
        </span>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          💳 Fee: PKR 35,000
        </span>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          Level: Beginner to Intermediate
        </span>
      </div>

      <h2 className="wd-section-heading" style={{ color: '#4a154b' }}>
        About this Course
      </h2>
      <p style={{ color: '#555', lineHeight: '1.6' }}>
        This masterclass goes deep on React — the library, not just the syntax. You'll learn to
        think in components, manage state cleanly, and structure applications the way production
        teams do, with a focus on patterns that scale beyond toy projects.
      </p>

      <h2 className="wd-section-heading" style={{ color: '#4a154b' }}>
        Syllabus
      </h2>
      <ul style={{ color: '#555', lineHeight: '1.6' }}>
        <li>Module 1: JSX, components, and props</li>
        <li>Module 2: Hooks — useState, useEffect, useContext, custom hooks</li>
        <li>Module 3: State management patterns and data flow</li>
        <li>Module 4: React Router — client-side routing and navigation</li>
        <li>Module 5: Performance — memoization, code splitting</li>
        <li>Module 6: Final project — a multi-page React application</li>
      </ul>

      <h2 className="wd-section-heading" style={{ color: '#4a154b', marginTop: '40px' }}>
        💻 Code You'll Learn to Write
      </h2>
      {CODE_SNIPPETS.map((snippet) => (
        <div key={snippet.title} style={{ marginBottom: '16px' }}>
          <h4 style={{ color: '#4a154b', margin: '0 0 8px 0' }}>{snippet.title}</h4>
          <pre
            style={{
              backgroundColor: '#2e0830',
              color: '#e9d5ff',
              padding: '16px',
              borderRadius: '8px',
              overflowX: 'auto',
              fontSize: '13px',
              lineHeight: 1.6,
              fontFamily: 'Consolas, Monaco, monospace',
            }}
          >
            <code>{snippet.code}</code>
          </pre>
        </div>
      ))}

      <h2 className="wd-section-heading" style={{ color: '#4a154b', marginTop: '40px' }}>
        👩‍🏫 Your Instructors
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {INSTRUCTORS.map((instructor) => (
          <div
            key={instructor.name}
            className="wd-card"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              padding: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <h4 style={{ color: '#4a154b', margin: '0 0 4px 0' }}>{instructor.name}</h4>
            <p style={{ color: '#6b21a8', fontSize: '13px', margin: '0 0 8px 0' }}>{instructor.title}</p>
            <p style={{ color: '#555', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{instructor.bio}</p>
          </div>
        ))}
      </div>

      <h2 className="wd-section-heading" style={{ color: '#4a154b', marginTop: '40px' }}>
        ⭐ Student Testimonials
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="wd-card"
            style={{
              backgroundColor: '#f9f5ff',
              border: '1px solid #e9d5ff',
              borderRadius: '8px',
              padding: '18px',
            }}
          >
            <p style={{ color: '#555', fontStyle: 'italic', margin: '0 0 10px 0', lineHeight: 1.6 }}>
              "{t.quote}"
            </p>
            <p style={{ color: '#4a154b', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{t.name}</p>
            <p style={{ color: '#6b21a8', margin: 0, fontSize: '13px' }}>{t.role}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="wd-btn-primary"
        style={{
          backgroundColor: '#4a154b',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '30px',
        }}
      >
        Enroll Now
      </button>

      {showForm && (
        <EnrollmentForm
          courseTitle="React Masterclass"
          courseSlug="react-masterclass"
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ReactMasterclass;