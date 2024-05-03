import React from 'react'
import { useNavigate  } from 'react-router';
import './List.css'

function List() {
    const navigate  = useNavigate();
    const handleClick = () => {
        alert('Order Accepted!');
        navigate('/');
      };



  return (
    <div className='Listpage'>
        <h1 className='orderheader'>Order List</h1>
        <div className='orderlane'>
        <div className='orderlistgroup'>
            <div className='orderlist1'>                
                <div className='orderlist1info'>
                    <h3>User Name: JohnCena</h3>
                    <h3>Location: Che Kung TempleTai Wai Tai Wai, 香港</h3>
                    <h3>Destination: 香港沙田第一城百得街22號</h3>
                    <h3>Fee: 66.1</h3>
                </div>
            <button onClick={handleClick}>Accept</button>
            </div>
        </div>
     </div>

    </div>
  )
}

export default List