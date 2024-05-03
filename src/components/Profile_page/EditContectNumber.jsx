import React, { useState } from 'react';
import './EditContactNumber.css';
import { Link, useNavigate } from 'react-router-dom';

function EditContectNumber() {
  const [phoneNum, setPhoneNum] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      phoneNum 
    };

    try {
      const response = await fetch('/api/user/editcontectnumber', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Contact number updated successfully:', result);
      navigate('/setting'); 

    } catch (error) {
      console.error('Failed to update contact number:', error);
    }
  };

  return (
    <div className='EditContectNumber'>
      <Link className='EditContactLink' to='/setting'>Back</Link>
      <h1 className='head'>Update Contact Number</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='C-form-text'>
          <h1>Edit your contact number here</h1>
        </div>
        <div className='editbox'>
          <label>Contact Number:</label>
          <input
              placeholder="Enter new contact number"
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
        </div>
        <button className="submit">Update</button>
      </form>
    </div>
  );
}

export default EditContectNumber;