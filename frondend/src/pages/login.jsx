import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import loginImg from '../assets/images/login.jpg';

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">LOGIN IN</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Email
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-8 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </label>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">
              Password
              <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
            </label>
          </div>
          <Button className="bg-blue-500 ml-28"><Link to="/signup">LOGIN IN</Link></Button>
        </form>
        <p className="text-white p-4 md:ml-40">
          Don&#39;t have an account?
          <span><Link to="/signup">Signup</Link></span>
        </p>
      </div>
    </div>
  );
}
