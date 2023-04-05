/* eslint-disable */
import React from 'react';
import Navbar from './Navbar';
import Routers from '../routes/Router';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

function Layout() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routers />
      <Footer />
    </BrowserRouter>
  );
}

export default Layout;
