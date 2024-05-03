import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      firstName,
      lastName,
      birthday
    };
  
    try {
      const response = await fetch('/api/user/editprofile', {
        method: 'PUT', // 使用 PUT 方法来更新资源
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Profile updated successfully:', result);
      navigate('/setting');

    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className='EditContactNumber'>
      <Link className='EditContactLink' to='/setting'>Back</Link>
      <h1 className='head'>Update Profile Information</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='C-form-text'>
          <h1>Edit your profile info here</h1>
        </div>
        <div className='editbox'>
          <label>Last Name</label>
          <input
              placeholder="LastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          <label>First Name:</label>
          <input
              placeholder="FirstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          <label>Birthday:</label>
          <input
              placeholder="d/m/y"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
        </div>
        <button className="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProfile;