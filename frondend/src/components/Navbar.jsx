/* eslint-disable */
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import Button from './Button';
import logo from '../assets/images/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'
import { Logout } from '../redux/actions/authAction';
import image from '../assets/images/profileAvator.jpg';

function Navbar() {
  const Links = [
    { name: 'HOME', link: '/' },
    { name: 'MESSAGE', link: '/conversation' },
    { name: 'LIKED ITEMS', link: '/liked-item' },
    { name: 'RENTED ITEMS', link: '/rented-item' },
  ];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const userLoggedIn = useSelector((state) => state.userLogin)
  const userInfo = userLoggedIn.authData
  const [isdropdownVisible, isSetDropdownVisible] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDropdown = () =>{
    isSetDropdownVisible(!isdropdownVisible);
  }
  const logout = () => {
    dispatch(Logout());
    setUser(null);
    navigate('/')
  };
  return (
    <div className="fixed shadow-md w-full  md:fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
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
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'
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
          <Button className="bg-blue-700 ml-8"><Link to="/rent-form">RENT FORM</Link></Button>
          {userInfo ? (
            <>
            <img type="button" className="w-10 h-10 rounded-full cursor-pointer" src={userInfo.Imglink ? userInfo.Imglink : image}  alt="User dropdown" onClick={handleDropdown} />
              <div className={`absolute right-0 mt-72 w-48 origin-top-right ${isdropdownVisible ? '' : 'hidden'} bg-white divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{userInfo.userName}</div>
                  <div className="font-medium truncate">{userInfo.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                  <li>
                    <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><Link to="/view-profile">View Profile</Link></p>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                </ul>
                <div className="py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logout}>Sign out</button>
                </div>
              </div>
              </>
              )
              : (<Button className="bg-black ml-8" ><Link to="/login">LOGIN</Link></Button>)
          }

            </ul>
      </div>
    </div>
  );
}

export default Navbar;
