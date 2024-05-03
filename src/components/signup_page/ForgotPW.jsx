import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import '../global.css';
import { useLocation } from 'react-router-dom';

function ForgotPW() {
    const [email, setEmail] = useState('');  
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/send-reset-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/ForgotPWpage', { state: { email } });  
        } catch (error) {
            console.error('Error sending reset email:', error);
        }
    };

    return (
        <div className='form-page'>
            <div className="form-container">
                <Link to='/login' className='signup-link'>Back</Link>
                <div className="logo-container">
                    Forgot Password
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email"
                                   placeholder="Enter your email" required=""
                                   value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button className="form-submit-btn" type="submit">Send Email</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPW;