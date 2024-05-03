import React from 'react';
import SignupForm from './SignupForm';
import './signup.css'
import '../global.css';


function Signup(){


return<div className='page'>
<div className='page-container'>
    <h1 className='text-h'>Welcome to CarToGo</h1>
    <p className='text-p'>Sign up to start your journey</p>
    <p className='text-p'>We are happy to provide service to you!</p>

        <div className='input'>
        <SignupForm/>
        </div>
        
</div>
</div>;
}

export default Signup;