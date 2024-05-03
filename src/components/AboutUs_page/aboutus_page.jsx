import React from 'react';
import '../global.css';
import './aboutus_page.css';
import FlipCard from './Flipcards'

function AboutUs() {
  
  const flipCards = [
    {
      frontContent: "Innovation and Progress",
      backContent: ["Embrace innovation and progress",
                    "Utilize cutting-edge technology to enhance the website and mobile application",
                    "Modern and dynamic headquarters reflecting our commitment to staying at the forefront",
                    "User-friendly interface and intuitive booking process"]
    },
    {
      frontContent: "Seamless and Convenient Access",
      backContent: ["Provide individuals in Hong Kong with seamless and convenient access to private and public car rentals",
                    "User-friendly platform for finding and booking the perfect vehicle",
                    "Hassle-free transportation experience"]
    },
    {
      frontContent: "Customer Satisfacation and Reliability",
      backContent: ["Primary focus on customer satisfaction and strategize innovative marketing campaigns",
                    "Meticulously manage the vehicle fleet for reliability and efficiency",
                    "Dedicated team of professionals ensuring customer needs are met",
                    "Exceed customer expectations for a seamless and reliable transportation solution"]
    },
    {
      frontContent: "Extensive Vehicle Fleet and Strategic Locations",
      backContent: ["Maintain an extensive vehicle fleet with diverse options to cater to different preferences and needs",
                    "Vehicles strategically located at huvbs across the city",
                    "Quick and convenient access to the fleet",
                    "Wide range of choices, including compact cars, SUVs, buses, and luxury vehicles"]
    }]


    return (
      <div className='AboutUs'>
        <div className='AboutUsbox1'>
          <div className='AboutUsbox1-contain1'>
            <h1 className='AbtUs_Header1'>About</h1>
            <h1 className='AbtUs_Header2'>Us</h1>
            <div className='contain1_textline'>
              <p> At CarToGo, we are dedicated to revolutionizing the way you travel. As a premier booking car company, we strive to provide a seamless and convenient transportation experience for our customers.</p>
              <p>Our mission is to connect riders with reliable and professional drivers, offering a safe and comfortable journey to their destinations. Whether you're commuting to work, exploring a new city, or heading to the airport, we've got you covered.</p>
            </div>
          </div>
          <div className='AboutUsbox1-contain2'>
            <img src={'image/aboutus1.jpg'} alt="" className='aboutus_img'/>
            </div>  
        </div>
        <div className='AboutUsbox2'>
          <div className='AboutUsbox2-contain1'>
            <div className='box2-textcontain'>
              <div className='box2-textcontain1'>
                <p className='box2-contain1-text1'>With a fleet of modern and well-maintained vehicles, we ensure that your ride is not only convenient but also luxurious. Our drivers are highly trained, courteous, and committed to delivering exceptional service.</p>
                <p className='box2-contain1-text2'>We are passionate about making your travel experience efficient, enjoyable, and stress-free. Join us in our mission to redefine transportation and experience the future of booking car services with CarToGo.</p>
              </div>
              <div className='box2-textcontain2'>
                <p className='box2-contain1-text3'>We prioritize your safety and security. Our platform employs advanced safety features, including real-time tracking, driver ratings, and 24/7 customer support, to provide you with peace of mind throughout your journey.</p>
              </div>
            </div>

          </div>
          <div className='AboutUsbox2-contain2'>
            <h1 className='AbtUs_Header3'>Our</h1>
            <h1 className='AbtUs_Header4'>Mission</h1>
          </div>
        </div>
        <div className='AboutUsbox3'>
          <div className='AboutUsbox3-contain1'>
          {flipCards.map((card, index) => (
          <FlipCard key={index} frontContent={card.frontContent} backContent={card.backContent} />
          ))}
          </div>
        </div>
      </div>
    );
}

export default AboutUs;