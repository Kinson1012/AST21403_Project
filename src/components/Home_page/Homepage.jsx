import React, { useState } from 'react';
import './Homepage.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useAuth } from '../AuthContex';

function Homepage() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const message = localStorage.getItem('passwordResetSuccess');
    if (message) {
      alert(message);
      localStorage.removeItem('passwordResetSuccess');
    }
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/session', {
        credentials: 'include'
      });
      const data = await response.json();
      return { isLoggedIn: data.isLoggedIn, role: data.role };
    } catch (error) {
      console.error('Failed to check session', error);
      return { isLoggedIn: false, role: null };
    }
  };

  useEffect(() => {
    showButton();
    const checkLoginStatus = async () => {
      const { isLoggedIn, role } = await checkSession();
      console.log("Login status:", isLoggedIn, "Role:", role);
      setIsLoggedIn(isLoggedIn);
      setRole(role);
    };
    checkLoginStatus();
  }, []);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
    console.log("Button visible:", button);
  };

  return (
    <div>
    <div className='Homepage-box1'>
      <div className="video-container">
        <video className='videoTag' src={'/video/sample1.mp4'} autoPlay loop muted />
        <div className='sticky-text'>
          <h4>Welcome to</h4>
          <h1>CarToGo</h1>
          <h3>Best Way To Enjoy The RoadTrip</h3>
          {isLoggedIn && role === 'user' && (
            <Link className='sticky-link' to='/bookcar'><button className='sticky-button'>Book a car now</button></Link>
          )}
          {isLoggedIn && role === 'driver' && (
            <Link className='sticky-link' to='/orderlist'><button className='sticky-button'>Get Order</button></Link>
          )}
        </div>
      </div>
    </div>
      <div className='Homepage-box2'>
        <div className='box2-container'>
          {/* <img className='Homeimgs2' src={'/image/homecar3.jpg'} alt='car image' /> */}
          <video className='videoTag2' src={'/video/sample2.mp4'} autoPlay loop muted />
          <div className='box2-container2'>
            <h1 className='box2-htext'>Under Any Situation</h1>
            <h1 className='box2-htext'>We Provide Our Best Service</h1>
            <p className='box2-ptext'>Under most weather condition, wherever your location and destination is, we provide the best service we could provide and make sure you have an prefect ride experience.</p>
          </div>
        </div>
        <div className='Homepage-box3'>
          <img className='Homeimgs3' src={'/image/ways-to-make-money-with-your-car.jpg'} alt='driver' />
          <div className='box3-container'>
            <div className='box3-h'>
              <h1>Become A Driver</h1>
            </div>
            <div className='box3-p'>
              <p>
                By joining us, you'll have the opportunity to be part of a reputable and reliable transportation network.
              </p>
              <p>
                As a CarToGo driver, you'll enjoy flexible working hours, competitive earnings, and the chance to connect with passengers from diverse backgrounds. Whether you're looking for a part-time gig or a full-time career, we have options that suit your needs.
              </p>
              <p>
                Safety is our top priority. Rest assured that we have implemented rigorous safety measures to protect both our drivers and passengers. Additionally, our dedicated support team is available 24/7 to assist you whenever needed.
              </p>
              <p>
                To get started, please sign up as a driver registration form. Once we receive your application, our team will review it promptly and reach out to you with further instructions. We look forward to welcoming you to the CarToGo family!
              </p>
              <Link className='HomepageLink' to='/DriverSignupForm'>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage