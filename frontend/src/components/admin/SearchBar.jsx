import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 15px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
      }}
    />
  );
};

export default SearchBar;