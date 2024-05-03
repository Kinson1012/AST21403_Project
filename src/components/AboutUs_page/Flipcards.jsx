import React, {useState} from 'react';
import './Flipcards.css'

const  Flipcards = ({ frontContent, backContent }) => {

const [isFlipped, setIsFlipped] = useState(false);

const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
        {frontContent}
        </div>
        <div className="flip-card-back">
          <ul>
            {backContent.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Flipcards