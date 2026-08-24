import React, { useState } from 'react';

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
};

const modalStyle = {
  backgroundColor: '#fff', borderRadius: '10px', padding: '30px',
  maxWidth: '420px', width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
};

const inputStyle = {
  width: '100%', padding: '10px', marginTop: '6px', marginBottom: '16px',
  border: '1px solid #d8b4fe', borderRadius: '6px', fontSize: '14px',
  boxSizing: 'border-box',
};

const labelStyle = { fontSize: '14px', color: '#4a154b', fontWeight: 'bold' };
const errorStyle = {
  color: '#dc2626',
  fontSize: '12px',
  marginBottom: '12px',
};
const EXPERIENCE_LEVELS = [
  'Complete Beginner',
  'Some Coding Experience',
  'Switching Careers into Tech'
];
const EnrollmentForm = ({ courseTitle, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' ,experience:''});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 5) {
      newErrors.name = 'Name must be at least 5 characters.';
    }
     if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number (11–15 digits).';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level.';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await axios.post(`${API_BASE}/api/enrollments`, {
        studentName: formData.name,
        studentEmail: formData.email,
        studentPhone: formData.phone,
        track: 'web-development',
        courseName: courseTitle,
        
        experience: formData.experience,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        'Something went wrong submitting your registration. Please try again in a moment.'
      );
    } finally {
      setSubmitting(false);
    }
  };
   
   
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(event) => event.stopPropagation()}>
        {!submitted ? (
          <>
            <h2 style={{ color: '#4a154b', marginTop: 0 }}>Enroll in {courseTitle}</h2>
            <p style={{ color: '#777', fontSize: '13px', marginTop: '-8px', marginBottom: '20px' }}>
              Tell us about yourself so we can prepare the onboarding material.
            </p>
            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}

              <label style={labelStyle}>Email Address</label>
              <input
                style={inputStyle}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}

              <label style={labelStyle}>Phone Number</label>
              <input
                style={inputStyle}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

              <label style={labelStyle}>Experience Level</label>
              <select
                style={inputStyle}
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select your experience level</option>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.experience && <p style={errorStyle}>{errors.experience}</p>}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ color: '#4a154b', margin: 0 }}>Enrollment submitted successfully!</h2>
            <p style={{ color: '#555', margin: 0 }}>
              Thanks for signing up for <strong>{courseTitle}</strong>. Our team will reach out
              to you shortly with next steps.
            </p>
            <button
              onClick={onClose}
              style={{
                width: '100%',
                backgroundColor: '#4a154b',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm;