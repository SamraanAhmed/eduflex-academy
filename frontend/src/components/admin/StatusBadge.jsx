import React from 'react';

const StatusBadge = ({ status }) => {
  const colors = {
    active: '#4CAF50',
    completed: '#2196F3',
    dropped: '#f44336',
  };

  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      backgroundColor: colors[status] || '#9E9E9E',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;