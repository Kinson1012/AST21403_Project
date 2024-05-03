import React from 'react';
import { Link } from 'react-router-dom';
import './option.css'
import '../global.css';

function Option() {
  return (
    <div className='option-page'>
    <div className='option-container'>
      <div>
        <h1 className='option-h'>Get Started</h1>
        <p className='option-p'>What wouold you like to sign up for</p>
        <Link to="/signup" className="option-link">
          <button className='option-button'>
            <div>
                <img className='imgs' src={process.env.PUBLIC_URL + '/image/customer.png'} alt="icon" />
            </div>
          Customer
          </button>
        </Link>
      </div>
      <div>
        <Link to="/DriverSignupForm" className="option-link">
          <button className='option-button'>
                <img className='imgs' src={process.env.PUBLIC_URL + '/image/driver.jpeg'} alt="icon" />
            Driver
          </button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Option;