import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Homepage';
import Login from '../pages/login';
import Signup from '../pages/signup';
import ResetPassword from '../pages/resetPassword';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-Password/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default Routers;
