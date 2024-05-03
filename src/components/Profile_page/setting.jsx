import React from 'react'
import { Link } from 'react-router-dom';
import './setting.css';

function setting() {
  return (
    <div className='SettingPage'>
        <h1 className='SettingHeader'>Setting</h1>
        <Link  className='SettingLink' to='/profile'>Back</Link> 
    <div className='SettingButtons'>   
        <Link className='SettingLinks' to="/EditProfile">
          <button className='EditProfile'>Edit Profile</button>
        </Link>
        <Link className='SettingLinks' to='/EditContectNumber'>
            <button>Change Contect Number</button>
        </Link>
        <Link className='SettingLinks' to='/Terms_And_Conditions'>
            <button>Terms and Conditions</button>
        </Link>
        <Link className='SettingLinks' to='/ResetPW'>
            <button>Reset Password</button>
        </Link>
        <div>
        </div>

    </div> 
    </div>
  )
}

export default setting