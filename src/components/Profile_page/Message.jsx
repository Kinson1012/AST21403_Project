import React, { useState } from 'react';
import './Message.css';

function Message() {
  const MsgData = [
    {
      question: "A driver has accepted your car ride booking",
      answer: ["Estimate Time: 10mins", "License plate number: CK6165", "please remain at your location, if there is any problem, the driver with contact you"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className='Message'>
      <div className='Messagemain'>
        <h1>Messages</h1>
        <div className='MessageLane'>
          {MsgData.map((Msg, index) => (
            <div key={index} className='Question' onClick={() => toggleAnswer(index)}>
              <img src="/image/bell.png" className='bellicon' alt="bell icon" />
              {Msg.question}
              {activeIndex === index && (
                <div className='Answer'>
                  {Msg.answer.map((answer, answerIndex) => (
                    <p key={answerIndex}>{answer}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Message;