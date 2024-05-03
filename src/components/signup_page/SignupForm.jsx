import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phoneNum === '' ||
      password === ''
    ) {
      setError('Please complete all fields.');
      hasErrors = true;
    }

    if (!agree) {
      setError('Please agree to the terms and conditions.');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNum,
          password,
        }),
      });

      if (response.ok) {
        console.log('User created successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNum('');
        setPassword('');
        setError('');
        navigate('/authentication'); // Redirect to the authentication page
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
    setError('');
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <div className='word-box'>
        <label className='quando-regular'>First Name</label>
        <input
          placeholder='John'
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <br />

        <label className='quando-regular'>Last Name</label>
        <input
          placeholder='Cena'
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <br />

        <label className='quando-regular'>Email</label>
        <input
          placeholder='example@email.com'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label className='quando-regular'>Phone Number</label>
        <input
          placeholder='12345678'
          type='tel'
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />

        <br />

        <label className='quando-regular'>Password</label>
        <input
          placeholder='Your Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='Login-link'>
        Already have an account?
        <Link to='/login' className='signin-link'>
          Login Now
        </Link>
      </div>

      <div className='checkboxTos'>
        <p className='checkbox-text'>
          When you check this box, you agree to our{' '}
          <Link to='/Terms_And_Conditions'>terms and conditions</Link>
        </p>
        <input
          type='checkbox'
          className='Toscheckbox'
          checked={agree}
          onChange={handleAgree}
        />
      </div>

      {error && <div className='error-msg'>{error}</div>}

      <div className='submit-container'>
        <button className='submit' type='submit'>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;