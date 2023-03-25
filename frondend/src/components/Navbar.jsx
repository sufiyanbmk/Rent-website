/* eslint-disable */
import React, { useState, useEffect, Fragment } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { json, Link, useLocation, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import Button from './Button';
import logo from '../assets/images/logo.jpg';
import { useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react'

function Navbar() {
  const Links = [
    { name: 'HOME', link: '/' },
    { name: 'MESSAGE', link: '/' },
    { name: 'LIKED ITEMS', link: '/liked-item' },
    { name: 'RENTED ITEMS', link: '/rented-item' },
  ];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    // const token = user?.res.token;

    // if (token) {
    //   const decodedToken = decode(token);

    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const logout = () => {
    dispatch({ type: 'LOGOUT', data: null });
    setUser(null);
    navigate('/')
  };
  return (
    <div className="fixed shadow-md w-full  md:fixed top-0 left-0">
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
          {user?.res||user?.success ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <p>view profile</p>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button className="bg-black  text-white w-48 p-2" onClick={logout}>LOGOUT</button>
                    )}
                  </Menu.Item>

                </Menu.Items>
              </Transition>
            </Menu>)
            : (<Button className="bg-black ml-8" ><Link to="/login">LOGIN</Link></Button>)
          }

        </ul>
      </div>
    </div>
  );
}

export default Navbar;
