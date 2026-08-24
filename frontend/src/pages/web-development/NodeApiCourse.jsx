import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnrollmentForm from './EnrollmentForm';
import './webdev-styles.css';

const BASE_FEE = 30000;
const INSTALLMENT_PLANS = [
  { months: 1, label: 'Pay in Full', discount: 0.05 },
  { months: 2, label: '2 Installments', discount: 0.02 },
  { months: 3, label: '3 Installments', discount: 0 },
];

const NodeApiCourse = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(INSTALLMENT_PLANS[2]);
  const totalAfterDiscount = BASE_FEE * (1 - selectedPlan.discount);
  const perInstallment = totalAfterDiscount / selectedPlan.months;

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
        <h1 style={{ color: '#d8b4fe', margin: '10px' }}>Node.js API Architecture</h1>
        <p style={{ color: 'white', margin: '0' }}>
          Build and secure production-grade REST APIs with Node.js and Express
        </p>
      </div>

      <div className="wd-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          ⏱ Duration: 2 Months
        </span>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          💳 Fee: PKR 30,000
        </span>
        <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '6px 12px', borderRadius: '6px', fontSize: '14px' }}>
          Level: Beginner to Advanced
        </span>
      </div>

      <h2 className="wd-section-heading" style={{ color: '#4a154b' }}>
        About this Course
      </h2>
      <p style={{ color: '#555', lineHeight: '1.6' }}>
        A backend-focused course on designing REST APIs that hold up in production — proper
        routing structure, authentication, error handling, and database integration. You'll
        finish with a fully working API and portfolio-ready project.
      </p>

      <h2 className="wd-section-heading" style={{ color: '#4a154b' }}>
        Syllabus
      </h2>
      <ul style={{ color: '#555', lineHeight: '1.6' }}>
        <li>Module 1: Node.js fundamentals and the event loop</li>
        <li>Module 2: Express.js routing, middleware, and controllers</li>
        <li>Module 3: MongoDB integration with Mongoose</li>
        <li>Module 4: Authentication & authorization (JWT)</li>
        <li>Module 5: Error handling, validation, and API security</li>
        <li>Module 6: Deployment and final API project</li>
      </ul>

      <h2 className="wd-section-heading" style={{ color: '#4a154b', marginTop: '40px' }}>
        🧮 Course Fee Calculator
      </h2>
      <div
        className="wd-card"
        style={{
          backgroundColor: '#f9f5ff',
          border: '1px solid #e9d5ff',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <p style={{ color: '#555', marginTop: 0, marginBottom: '16px', fontSize: '14px' }}>
          Choose a payment plan to see your cost breakdown.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {INSTALLMENT_PLANS.map((plan) => (
            <button
              key={plan.months}
              onClick={() => setSelectedPlan(plan)}
              className="wd-btn-secondary"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: selectedPlan.months === plan.months ? '2px solid #4a154b' : '1px solid #d8b4fe',
                backgroundColor: selectedPlan.months === plan.months ? '#4a154b' : '#fff',
                color: selectedPlan.months === plan.months ? '#fff' : '#4a154b',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedPlan.months === plan.months ? 'bold' : 'normal',
              }}
            >
              {plan.label}
              {plan.discount > 0 && ` (${plan.discount * 100}% off)`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#555' }}>Base course fee</span>
          <span style={{ color: '#555' }}>PKR {BASE_FEE.toLocaleString()}</span>
        </div>
        {selectedPlan.discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#16a34a' }}>Discount ({selectedPlan.discount * 100}%)</span>
            <span style={{ color: '#16a34a' }}>
              − PKR {(BASE_FEE * selectedPlan.discount).toLocaleString()}
            </span>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '10px',
            marginTop: '10px',
            borderTop: '1px solid #e9d5ff',
            fontWeight: 'bold',
          }}
        >
          <span style={{ color: '#4a154b' }}>
            {selectedPlan.months === 1 ? 'Total (one-time)' : `${selectedPlan.months} × Monthly Installment`}
          </span>
          <span style={{ color: '#4a154b' }}>
            PKR {Math.round(perInstallment).toLocaleString()}
            {selectedPlan.months > 1 && ' /month'}
          </span>
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #4a154b, #2e0830)',
          borderRadius: '10px',
          padding: '30px',
          marginTop: '40px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#d8b4fe', margin: '0 0 10px 0' }}>Ready to master backend architecture?</h2>
        <p style={{ color: '#e9d5ff', margin: '0 0 20px 0', fontSize: '15px' }}>
          Seats for the next cohort are limited. Secure your spot in the Node.js API Architecture Course today.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="wd-btn-primary"
          style={{
            backgroundColor: '#fff',
            color: '#4a154b',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Reserve Your Seat →
        </button>
      </div>

      {showForm && (
        <EnrollmentForm
          courseTitle="Node.js API Architecture Course"
          courseSlug="node-api-course"
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default NodeApiCourse;