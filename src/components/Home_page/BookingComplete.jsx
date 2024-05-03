import React from 'react'
import { Link } from 'react-router-dom';
import './BookingComplete.css'

function BookingComplete() {
  return (
    <div className='BookingSuccessful'>
        <img src="/image/tick.png" alt='tick' className='tickimg'/>
        <div className='textgroupB'>
          <h1 className='BCheader'>Booking Has Successfully Completed</h1>
          <p>We are thrilled to confirm your resertvation for the car ride that you booked. You are all set to enjoy your car ride to your destination. You can see your booking details in message in your profile page. If there is any other problem you can also contact with the driver once there is a driver accepted your order.</p>
      </div>
      <Link to="/"><button>Back To Home Page</button></Link>
    </div>
  )
}

export default BookingComplete