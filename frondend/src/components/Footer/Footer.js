import React from 'react';
// import { Link } from "react-router-dom";
import { BsYoutube } from 'react-icons/bs';
import logo from '../../assets/images/logo.jpg';
import ItemsContainer from './ItemsContainer';

function Footer() {
  return (
    <footer className="md:fixed  bottom-0 w-full text-lg bg-blue-900 px-4 py-6 z-10 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <img className="w-16" src={logo} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <BsYoutube />
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
}

export default Footer;
