import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev); // Toggle search input visibility
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
    onSearch(e.target.value); // Send search term back to App component
  };

  return (
    <div className="h-div">
      <h1>Peachy's Movie Palace</h1>
      <button onClick={handleSearchClick} className="search-button">
        {showSearch ? 'Close Search' : 'Search'}
      </button>
      {showSearch && (
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      )}
    </div>
  );
};

export default Header;
