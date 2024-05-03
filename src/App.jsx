import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/signup_page/signup';
import ForgotPW from './components/signup_page/ForgotPW';
import Login from './components/signup_page/Login';
import Option from './components/signup_page/option';
import Homepage from './components/Home_page/Homepage';
import AboutUs from './components/AboutUs_page/aboutus_page';
import TOS from './components/TOS';
import './components/font.css';
import SignupForm from './components/signup_page/DriverSignUpForm';
import ProfilePage from './components/Profile_page/profile_page';
import Settings from './components/Profile_page/setting';
import ContectNum from './components/Profile_page/EditContectNumber';
import Edit_Profile from './components/Profile_page/EditProfile';
import ResetPW from './components/Profile_page/ResetPW';
import BookcarPage from './components/Home_page/bookcar';
import PaymentPage from './components/Home_page/PaymentPage';
import BookingCompletePage from './components/Home_page/BookingComplete';
import Auth from './components/signup_page/AuthPage';
import Help from './components/FAQ_page/FAQpage';
import { AuthProvider } from './components/AuthContex';
import ResetPWpage from './components/Profile_page/ResetPW_Page';
import ForgotPWpage from './components/signup_page/ForgetPW_Page';
import ChatBot from 'react-simple-chatbot';
import List from './components/Home_page/List'
import Message from './components/Profile_page/Message'
const libraries = ['places'];

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '///',
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      // Google Maps API script has been loaded
      // You can initialize any additional functionality here
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }


  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'How can I can help today?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Please wait',
              end: true,
            },
          ]}
          floating={true}
          headerTitle = {'CustomerService'}
        />
        {isLoaded ? (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ForgotPW" element={<ForgotPW />} />
            <Route path="/login" element={<Login />} />
            <Route path="/option" element={<Option />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/DriverSignupForm" element={<SignupForm />} />
            <Route path="/Terms_And_Conditions" element={<TOS />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/EditContectNumber" element={<ContectNum />} />
            <Route path="/EditProfile" element={<Edit_Profile />} />
            <Route path="/ResetPW" element={<ResetPW />} />
            <Route path="/bookcar" element={<BookcarPage />} />
            <Route path="/Payment" element={<PaymentPage />} />
            <Route path="/BookingComplete" element={<BookingCompletePage />} />
            <Route path="/authentication" element={<Auth />} />
            <Route path="/Help" element={<Help />} />
            <Route path="/ResetPWpage" element={<ResetPWpage />} />
            <Route path="/ForgotPWpage" element={<ForgotPWpage />} />
            <Route path="/OrderList" element={<List/>}/>
            <Route path="/Message" element={<Message/>}/>
          </Routes>
        ) : (
          <div>Loading Google Maps...</div>
        )}
      </AuthProvider>
    </BrowserRouter >
  );
};

export default App;