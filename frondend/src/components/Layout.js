import React from 'react';
import Navbar from './navbar';
import Footer from './Footer/Footer';
import Routers from '../routes/Router';

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
