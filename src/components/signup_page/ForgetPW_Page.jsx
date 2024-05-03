import React, { useState } from 'react';  
import { useNavigate,useLocation } from 'react-router-dom';
import '../Profile_page/GlobalResetPW.css';

function ForgetPW_Page() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 
  const { email } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email); // Make sure 'email' is defined in the scope

    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code, newPassword }) // Ensure 'code' and 'newPassword' are also defined
        });

        const data = await response.json(); // Assumes that the server response is JSON

        if (response.ok) {
            alert(data.message); // Good practice to handle a successful response
            navigate('/'); // Ensure 'navigate' is defined (possibly from react-router-dom)
        } else {
            // This error handling assumes that server always responds with a JSON having a 'message' property
            throw new Error(data.message || 'Failed to reset password');
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        alert(error.message); // Good to inform the user, but consider more user-friendly error handling
    }
};

  return (
    <div className='ResetPW-page'>
        <div className="Reset-container">
          <div className="PWreset-container2">
            <h1 className='Reset-header'>Forgot Password</h1>
    
            <form className="ResetForm" onSubmit={handleSubmit}>
              <div className="Reset-group">
                <p>Insert the 6 digital code received from the email you previously insert and change a new Password</p>
                <h3 className="Reset-text">6 digital code</h3>
                <input className="Reset-code" placeholder="Enter the 6 digital code" required onChange={e => setCode(e.target.value)} value={code}/>
                <h3 className='Reset-text'>New Password</h3>
                <input type="password" className="Reset-PW" placeholder="Enter New Password" required onChange={e => setNewPassword(e.target.value)} value={newPassword}/>
              </div>
              <div className='form-submit-btn'>
                <button className="submit" type="submit">Password Reset</button>
              </div>
            </form>
          </div>
        </div>   
    </div>
  );
}

export default ForgetPW_Page;