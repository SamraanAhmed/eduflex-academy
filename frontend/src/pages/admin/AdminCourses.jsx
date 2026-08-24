import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    track: 'fullstack',
    instructor: '',
    duration: '',
    price: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await apiClient.adminGetAllCourses();
      setCourses(res.data || []);
      setError('');
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.adminUpdateCourse(editing._id, form);
      } else {
        await apiClient.adminCreateCourse(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '', track: 'fullstack', instructor: '', duration: '', price: 0 });
      await fetchCourses();
    } catch (err) {
      setError('Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await apiClient.adminDeleteCourse(id);
      await fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  const handleEdit = (course) => {
    setEditing(course);
    setForm({
      title: course.title,
      description: course.description || '',
      track: course.track,
      instructor: course.instructor,
      duration: course.duration,
      price: course.price || 0,
    });
    setShowForm(true);
  };

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading courses...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Course Management</h1>
        <button onClick={() => {
          setShowForm(!showForm);
          setEditing(null);
          setForm({ title: '', description: '', track: 'fullstack', instructor: '', duration: '', price: 0 });
        }} style={{
          padding: '10px 20px', background: '#4CAF50', color: 'white',
          border: 'none', borderRadius: '5px', cursor: 'pointer'
        }}>
          {showForm ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#ffebee', padding: '10px', borderRadius: '5px', color: '#c62828', marginBottom: '20px' }}>
          {error}
          <button onClick={() => setError('')} style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {showForm && (
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <h3>{editing ? 'Edit Course' : 'New Course'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input type="text" placeholder="Title" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Instructor" value={form.instructor}
              onChange={(e) => setForm({ ...form, instructor: e.target.value })} required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Duration (e.g., 6 weeks)" value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })} required
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <select value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="fullstack">Full Stack</option>
              <option value="datascience">Data Science</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="uiux">UI/UX</option>
            </select>
            <input type="number" placeholder="Price (0 = free)" value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <textarea placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', gridColumn: '1 / -1' }} rows="3" />
            <button type="submit" style={{
              gridColumn: '1 / -1', padding: '12px', background: '#2196F3',
              color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px'
            }}>
              {editing ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Track</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Instructor</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Duration</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}><strong>{c.title}</strong></td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: '#e0e0e0', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                    {c.track}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{c.instructor}</td>
                <td style={{ padding: '12px' }}>{c.duration}</td>
                <td style={{ padding: '12px' }}>${c.price}</td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => handleEdit(c)} style={{
                    padding: '5px 12px', background: '#FF9800', color: 'white',
                    border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '8px'
                  }}>Edit</button>
                  <button onClick={() => handleDelete(c._id)} style={{
                    padding: '5px 12px', background: '#f44336', color: 'white',
                    border: 'none', borderRadius: '3px', cursor: 'pointer'
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;