/* eslint-disable */
import React, { useState } from 'react';
import Button from './Button';
import logo from '../assets/images/logo.jpg';
import {AiOutlineMenu} from 'react-icons/ai'
import { Link } from 'react-router-dom';

function Navbar() {
  const Links = [
    { name: "HOME", link: "/" },
    { name: "MESSAGE", link: "/" },
    { name: "LIKED ITEMS", link: "/" },
    { name: "RENTED ITEMS", link: "/" },
    // { name: "CONTACT", link: "/" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed shadow-md w-full  md:relative top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]
      text-gray-800"
        >
          <div className="">
            <img
              className="max-w-sm w-20 rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
              src={logo}
              alt=""
            />
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {/* <ion-icon name={open ? 'close' : 'menu'} /> */}
        
          <AiOutlineMenu />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-9 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
           <Button className="bg-blue-600 ml-8"><Link to='/login'>RENT FORM</Link></Button>
           <Button className="bg-dark-600 ml-8"><Link to = '/login'>LOGIN</Link></Button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
