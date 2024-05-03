import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import { useAuth } from './AuthContex';

import './font.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch('/api/session', {
        credentials: 'include'
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error('Failed to check session', error);
      return false;
    }
  };

  useEffect(() => {
    showButton();
    const checkLoginStatus = async () => {
      const loggedIn = await checkSession();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleResize = () => showButton();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      setIsLoggedIn(false);
      navigate('/');
    } else {
      console.error("Logout failed:", data.message);
    }
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={'image/White_Logo1.png'} className='LOGO'/>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <FontAwesomeIcon icon={click ? faXmark : faBars} />
        </div>
        <ul className={click ? 'nav-menu nav-menu-active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li className='nav-item'>
              <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Your Profile
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link to='/Help' className='nav-links' onClick={closeMobileMenu}>
              FAQs
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/aboutus' className='nav-links' onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>
          <li className='nav-item'>
            {isLoggedIn ? (
              <button
                onClick={logout}
                style={{
                  alignItems: 'center',
                  appearance: 'none',
                  backgroundColor: '#fff',
                  borderRadius: '24px',
                  borderStyle: 'none',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0 3px 5px -1px, rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0',
                  boxSizing: 'border-box',
                  color: '#3c4043',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  fill: 'currentcolor',
                  fontFamily: 'Uber Move',
                  fontSize: '14px',
                  fontWeight: '500',
                  height: '40px',
                  justifyContent: 'center',
                  letterSpacing: '.25px',
                  lineHeight: 'normal',
                  maxWidth: '100%',
                  overflow: 'visible',
                  padding: '0.1px 24px',
                  position: 'relative',
                  textAlign: 'center',
                  textTransform: 'none',
                  transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  touchAction: 'manipulation',
                  width: 'auto',
                  willChange: 'transform, opacity',
                  zIndex: 0,
                  marginTop: '26px',
                }}
              >
                Logout
              </button>
            ) : (
              <Link to='/login' className='nav-links' onClick={closeMobileMenu}>Login</Link>
            )}
          </li>
        </ul>
        {!isLoggedIn && (
          <Button buttonStyle="btn--outline">SIGN UP</Button>
        )}
      </div>
    </div >
  );
}

export default Navbar;