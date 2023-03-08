import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from '../pages/Home';
import Login from '../pages/login';
// import Register from '../pages/Register';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}

export default Routers;
