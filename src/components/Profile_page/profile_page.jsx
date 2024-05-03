import React, { useState, useEffect } from 'react';
import './profile_page.css';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    phoneNumber: '',
    birthday: 'N/A',
    fullName: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData({
          email: data.email || 'N/A',
          phoneNumber: data.phoneNum || 'N/A', 
          birthday: data.birthday ? new Date(data.birthday).toLocaleDateString() : 'N/A', 
          fullName: `${data.lastName || ''} ${data.firstName || ''}`.trim()
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <div className="profile-page">
      <h1 className="profile-header">Profile</h1>
      <div className="profile-picture">
        <label htmlFor="profile-picture-input" className="profile-picture-label">
          {profilePicture && <img className="profile_img" src={profilePicture} alt="Profile Pic" />}
          <span className="profile-picture-span">Change Profile Picture</span>
        </label>
        <input
          id="profile-picture-input"
          type="file"
          accept="image/*"
          onChange={handlePictureChange}
        />
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{userData.fullName}</h1>
        <div className='profile-data'>
          <p>About Me: Hello, Welcome to my profile</p>
          <br/>
          <p>Birthday: {userData.birthday}</p>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
        </div>
      </div>
      <div className="profile-buttons">
        <Link className="settingLink" to="/setting">
          <button className="setting">Setting</button>
        </Link>
        <Link className="MessageLink" to="/Message">
          <button className="Messagebtn">Messages</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;