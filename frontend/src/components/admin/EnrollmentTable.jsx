import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import apiClient from '../../utils/apiClient';

const EnrollmentTable = ({ enrollments, onUpdate }) => {
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState('');

  const handleStatusChange = async (enrollmentId, newStatus) => {
    try {
      setUpdating(enrollmentId);
      setError('');
      await apiClient.adminUpdateEnrollmentStatus(enrollmentId, newStatus);
      if (onUpdate) onUpdate();
      setUpdating(null);
    } catch (err) {
      setError('Failed to update status');
      setUpdating(null);
    }
  };

  if (!enrollments || enrollments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3>No enrollments found</h3>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#ffebee', borderRadius: '5px', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Student</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Course</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Track</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Status</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Progress</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Enrolled</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>
                <strong>{enrollment.studentId?.name || 'Unknown'}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {enrollment.studentId?.email || ''}
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <strong>{enrollment.courseId?.title || 'Unknown'}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {enrollment.courseId?.instructor || ''}
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  backgroundColor: '#e0e0e0',
                  fontSize: '12px'
                }}>
                  {enrollment.courseId?.track || 'N/A'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                <StatusBadge status={enrollment.status} />
              </td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '60px',
                    height: '6px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: enrollment.progress + '%',
                      height: '100%',
                      backgroundColor: enrollment.progress === 100 ? '#4CAF50' : '#2196F3',
                    }} />
                  </div>
                  <span>{enrollment.progress}%</span>
                </div>
              </td>
              <td style={{ padding: '12px', fontSize: '12px' }}>
                {new Date(enrollment.enrolledAt).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px' }}>
                <select
                  value={enrollment.status}
                  onChange={(e) => handleStatusChange(enrollment._id, e.target.value)}
                  disabled={updating === enrollment._id}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    cursor: 'pointer',
                    backgroundColor: updating === enrollment._id ? '#f5f5f5' : 'white'
                  }}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>
                {updating === enrollment._id && (
                  <span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>Updating...</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable;