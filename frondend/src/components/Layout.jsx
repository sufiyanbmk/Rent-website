import React from 'react';
import Navbar from './Navbar';
import Routers from '../routes/Router';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Navbar />
      <Routers />
      <Footer />
    </>
  );
}

export default Layout;
