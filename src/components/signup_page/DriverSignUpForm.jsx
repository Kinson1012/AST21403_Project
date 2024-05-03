import React, { useState } from 'react';
import './DriverSignUpForm.css';
import './SignupForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../global.css';

const DriverSignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [setLicenseFile] = useState(null);
  const [setHkidFile] = useState(null);
  const navigate = useNavigate();

  const handleLicenseFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setLicenseFile(selectedFile);
  };

  const handleHkidFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setHkidFile(selectedFile);}

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (!agree) {
      setError('Please agree to the terms and conditions.');
      hasErrors = true;
    }

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

    if (hasErrors) {
      return;
    }

    const formData = {
      firstName,
      lastName,
      email,
      phoneNum,
      password,
    };

    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Driver created successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNum('');
        setPassword('');
        setError('');
        navigate('/');
      } else {
        console.error('Failed to create driver');
      }
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
    setError('');
  };

  return (
    <>
      <div className='D_form_header'>
        <h1>Welcome to CarToGo</h1>
        <h1>Join our team of professional drivers and provide exceptional transportation services.</h1>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="word-box">
          <label className="quando-regular">First Name</label>
          <input
            placeholder="John"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <br />

          <label className="quando-regular">Last Name</label>
          <input
            placeholder="Cena"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <br />

          <label className="quando-regular">Email</label>
          <input
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label className="quando-regular">Phone Number</label>
          <input
            placeholder="12345678"
            type="tel"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />

          <br />

          <label className="quando-regular">Password</label>
          <input
            placeholder="Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

          <label className="quando-regular">Driver License</label>
          <input type="file" name="licenseFile" onChange={handleLicenseFileChange} />

          <label className="quando-regular">HKID</label>
          <input type="file" name="hkidFile" onChange={handleHkidFileChange} />

        <div className="Login-link">
          Already have an account?&nbsp;
          <Link to="/login" className="signin-link">
            Login Now
          </Link>
        </div>

        <div className="checkboxTos">
          <p className="checkbox-text">
            When you check this box, you agree to our{' '}
            <Link to="/Terms_And_Conditions">terms and conditions</Link>
          </p>
          <input
            type="checkbox"
            className="Toscheckbox"
            checked={agree}
            onChange={handleAgree}
          />
        </div>

        {error && <div className="error-msg">{error}</div>}

        <div className="submit-container">
          <button className="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default DriverSignupForm;