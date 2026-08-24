import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const res = await apiClient.adminGetAllEnrollments();
      setEnrollments(res.data || []);
      setFiltered(res.data || []);
      setError('');
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch enrollments');
      setLoading(false);
    }
  };

  const handleStatusChange = async (enrollmentId, newStatus) => {
    try {
      setUpdating(enrollmentId);
      await apiClient.adminUpdateEnrollmentStatus(enrollmentId, newStatus);
      await fetchEnrollments();
      setUpdating(null);
    } catch (err) {
      setError('Failed to update status');
      setUpdating(null);
    }
  };

  useEffect(() => {
    let result = enrollments;

    if (statusFilter !== 'all') {
      result = result.filter(e => e.status === statusFilter);
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(e =>
        e.studentId?.name?.toLowerCase().includes(term) ||
        e.studentId?.email?.toLowerCase().includes(term) ||
        e.courseId?.title?.toLowerCase().includes(term)
      );
    }

    setFiltered(result);
  }, [enrollments, search, statusFilter]);

  const getStatusBadge = (status) => {
    const colors = {
      active: { bg: '#e8f5e9', text: '#2e7d32' },
      completed: { bg: '#e3f2fd', text: '#1565c0' },
      dropped: { bg: '#ffebee', text: '#c62828' },
    };
    const style = colors[status] || { bg: '#f5f5f5', text: '#616161' };
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '4px',
        backgroundColor: style.bg,
        color: style.text,
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'capitalize'
      }}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>Loading enrollments...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#c62828' }}>
        <p>{error}</p>
        <button onClick={fetchEnrollments} style={{
          padding: '10px 20px',
          background: '#1565c0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '16px'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
          Enrollment Management
        </h1>
        <button
          onClick={fetchEnrollments}
          style={{
            padding: '8px 16px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Refresh
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Search by student or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>
      </div>

      {/* Count */}
      <div style={{ marginBottom: '16px', color: '#616161', fontSize: '14px' }}>
        Showing {filtered.length} of {enrollments.length} enrollments
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          border: '1px solid #e0e0e0'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Student
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Course
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Track
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Status
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Progress
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Enrolled Date
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0', fontWeight: '600' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#757575' }}>
                  No enrollments found
                </td>
              </tr>
            ) : (
              filtered.map((enrollment) => (
                <tr key={enrollment._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '500' }}>{enrollment.studentId?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: '#757575' }}>
                      {enrollment.studentId?.email || ''}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '500' }}>{enrollment.courseId?.title || 'Unknown'}</div>
                    <div style={{ fontSize: '12px', color: '#757575' }}>
                      {enrollment.courseId?.instructor || ''}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: '4px',
                      backgroundColor: '#e0e0e0',
                      fontSize: '12px'
                    }}>
                      {enrollment.courseId?.track || 'N/A'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {getStatusBadge(enrollment.status)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '80px',
                        height: '6px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: enrollment.progress + '%',
                          height: '100%',
                          backgroundColor: enrollment.progress === 100 ? '#43a047' : '#1976d2'
                        }} />
                      </div>
                      <span style={{ fontSize: '12px' }}>{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px' }}>
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={enrollment.status}
                      onChange={(e) => handleStatusChange(enrollment._id, e.target.value)}
                      disabled={updating === enrollment._id}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        backgroundColor: updating === enrollment._id ? '#f5f5f5' : 'white',
                        fontSize: '12px'
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="dropped">Dropped</option>
                    </select>
                    {updating === enrollment._id && (
                      <span style={{ marginLeft: '8px', fontSize: '12px', color: '#757575' }}>
                        Updating...
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEnrollments;