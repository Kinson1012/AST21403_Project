import React, { useState } from 'react';
import './FAQpage.css';

const FAQpage = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const faqData = [
    {
      question: 'How Do I Book A Car Ride?',
      answer: 'You can book a car ride by clicking on "Book a car now", you will then lead to a booking page, insert your location and destination or clicking on the google map and select your desired vehicle, after payment, your driver will arrive to your location in a certain amount of time.',
    },
    {
      question: 'How can I pay for my car ride?',
      answer: 'We offer credit card payment options to make your car ride booking convenient. We offer all kind of credit cards payment. Simply enter your credit card info to complete the payment.',
    },
    {
      question: 'Are the drivers licensed and reliable?',
      answer: ' Yes, all our drivers are licensed and undergo a thorough screening process to ensure they meet our quality and safety standards. Every driver will had to provide their driver license and HKID before sign up, we check all our driver info before they are able to become a CarToGo driver. We carefully select and vet our drivers to provide you with a reliable and secure car ride experience.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'If you need any assistance or have any questions, our customer support team is here to help. You can ask question in the chat bot here. If you have further question and problems, you can ask the chat bot for customer support phone number and email. Our dedicated support agents will assist you with any queries, concerns, or feedback you may have.',
    },
    {
      question: 'What types of vehicles are available for booking?',
      answer: 'We offer a variety of vehicles to cater to your specific needs. Our fleet includes standard sedans, luxury cars, SUVs, and even larger vehicles for group travel. During the booking process, you can select the vehicle type that suits your requirements and preferences. Rest assured that all vehicles in our fleet are well-maintained, comfortable, and equipped with modern amenities.',
    },
    {
      question: 'Are there any additional fees for car ride bookings?',
      answer: 'The fees for booking a car ride is calculated with distances and type of vehicles. There will be no other extra fees for booking the car ride, during the car ride, and after the car ride.',
    },
  ];

  return (
    <div className="FAQPage">
      <h1 className='FAQHeader'>FAQs</h1>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`FAQItem ${expandedItems.includes(index) ? 'expanded' : ''}`}
          onClick={() => toggleItem(index)}
        >
          <div className='FAQbox'>
            <div className='FAQquestion'>
              <h3>{item.question}</h3>
            </div>
            <div className='FAQarrow'>
              <svg width='15' height='10' viewBox='0 0 42 25'>
                <path d='M3 3L21 21L39 3' stroke='white' stroke-width='7' stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQpage;