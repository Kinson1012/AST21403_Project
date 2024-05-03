import React, { useState } from 'react';
import './AuthPage.css';

function AuthPage() {
  const [authCode, setAuthCode] = useState('');

  const handleAuthCodeChange = (event) => {
    setAuthCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your code to process the authentication code here
    console.log('Submitted authentication code:', authCode);
    // Reset the input field after submission
    setAuthCode('');
  };

  return (
    <div className='AuthPage'>
      <h1 className='AuthPageHeader'>Insert the code you received from your email</h1>
      <h1 className='AuthPageHeader'>You should have received a 6-digit code</h1>
      <h1 className='AuthPageHeader'>Insert the 6-digit code to finish the signup</h1>
      <form className='inputcode-container' onSubmit={handleSubmit}>
        <input
          type='text'
          className='inputcode'
          placeholder='Authentication code'
          value={authCode}
          onChange={handleAuthCodeChange}
        />
        <button type='submit' className='sentCode'>
          Submit Authentication Code
        </button>
      </form>
    </div>
  );
}

export default AuthPage;