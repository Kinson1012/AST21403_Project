import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ResetPW.css';

function ResetPW() {
    const [oldPassword, setOldPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await fetch('/api/validate-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: oldPassword }),
            });
            const data = await response.json();
            if (data.isValid) {
                navigate('/ResetPWpage');
            } else {
                setError('Password is incorrect.');
            }
        } catch (error) {
            console.error('Error validating password:', error);
            setError('Failed to validate password.');
        }
    };

    return (
        <>
            <Link to='/setting' className='ResetPW-link'>Back</Link>
            <div className='ResetPW-page'>
                <div className="ResetPW-container">
                    <div className="ResetPW-container2">
                        <h1 className='ResetPW-header'>Reset Password</h1>
                        <form className="ResetPW" onSubmit={handleSubmit}>
                            <div className="ResetPW-group">
                                <h3 className="ResetPW-text">Insert Old Password</h3>
                                <input
                                    type="password"
                                    className="ResetPW_password"
                                    placeholder="Enter your old password"
                                    required=""
                                    value={oldPassword}
                                    onChange={handleOldPasswordChange}
                                />
                            </div>
                            <div className='form-submit-btn'>
                                <button className="submit" type="submit">Submit</button>
                            </div>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPW;