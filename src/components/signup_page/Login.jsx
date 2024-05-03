import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContex';
import './Form.css';
import '../global.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const {isLoggedIn} = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful, assume the server sets a session cookie
        // Redirect to a dashboard or home page as appropriate
        login();
        console.log("Is user logged in?", isLoggedIn);
        navigate('/'); // Adjust the route as needed
        setTimeout(() => {
          window.location.reload();
      }, 10);
      } else {
        // Handle errors, such as incorrect credentials
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <b>Login Your Account</b>
        <div className="logo-container">
          <br />
          <br />
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button className="form-submit-btn" type="submit">
              Login
            </button>
            <br />
            <div className="pwreset-link">
              Forgot password?&nbsp;
              <Link to="/ForgotPW" className="ForgotPW">
                Click here to Reset
              </Link>
              <br />
              <br />
            </div>
            <div className="signup-link">
              Don't have an account?
              <Link to="/option" className="signup-link">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;