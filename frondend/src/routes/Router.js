import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Homepage';
import Login from '../pages/login';
import Signup from '../pages/signup';
import ResetPassword from '../pages/ResetPassword';
import VerifyEmail from '../pages/VerifyMail';
import OtpLogin from '../pages/OtpLogin';
import RentForm from '../pages/RentForm';
import RentedItem from '../pages/RentedItem';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-Password/:id/:token" element={<ResetPassword />} />
      <Route path="/verify-mail/:token" element={<VerifyEmail />} />
      <Route path="/otp-login/:mobile" element={<OtpLogin />} />
      <Route path="/rent-form" element={<RentForm />} />
      <Route path="/rented-item" element={<RentedItem />} />
    </Routes>
  );
}

export default Routers;
