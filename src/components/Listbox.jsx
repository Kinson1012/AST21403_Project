import React, { useState } from 'react';
// import './ListBox.css';

function ListBox() {
  const [selectedOption, setSelectedOption] = useState(''); // State to hold the selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option when it changes
  };

  return (
    <div className="listbox-container">
      <label className="listbox-label">What are you signup for:</label>
      <select
        className="listbox-select"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="Option 1">Customer</option>
        <option value="Option 2">Driver</option>
      </select>
    </div>
  );
}

export default ListBox;