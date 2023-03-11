import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

function Adminauth() {
  const admin = useSelector((state) => state.user.user);
  return (
    admin ? <Outlet /> : <Navigate to="/login" />
  );
}

export default Adminauth;
