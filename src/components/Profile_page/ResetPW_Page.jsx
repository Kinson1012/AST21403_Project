import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './GlobalResetPW.css'

function ResetPW_Page() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange1 = (event) => {
    setInput1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInput2(event.target.value);
  };

  const handleSubmit = async () => {
    if (input1 !== input2) {
      setAlertMessage('The two passwords are different.');
    } else {
      setAlertMessage('');
    }

    try {
      const response = await fetch('/api/session-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: input1 }),
      });
    
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
    
      const result = await response.json();
      setAlertMessage(result.message);
      localStorage.setItem('passwordResetSuccess', 'Password has been successfully reset.');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('Failed to reset password.');
    }

  };

  return (
    <div>
      <Link to='/ResetPW' className='Reset-link'>Back</Link>
      <div className='Reset-page'>
        <div className="Reset-container">
          <div className="PWreset-container2">
            <form className="ResetForm">
              <div className="Reset-group">
                <h1 className='Reset-header'>Reset your Password</h1>
                <h3 className='Reset-text'>New Password</h3>
                <input type="password" value={input1} onChange={handleInputChange1} className="Reset-PW" placeholder="Enter New Password" required />

                <h3 className='Reset-text'>Confirm Password</h3>
                <input type="password" value={input2} onChange={handleInputChange2} className="Reset-PW" placeholder="Confirm New Password" required />
              </div>
              <div className='form-submit-btn'>
                <button className="submit" type="button" onClick={handleSubmit}>Password Reset</button>
              </div>
            </form>
            {alertMessage && <p className="alert-message">{alertMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPW_Page;