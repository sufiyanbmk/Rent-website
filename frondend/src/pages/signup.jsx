import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import signupImg from '../assets/images/signup.jpg';

export default function Signup() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={signupImg} alt="" />
      </div>

      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl dark:text-white font-bold text-center">SIGN UP</h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Username
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </label>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Email
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-14 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </label>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Phone
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
            </label>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">
              Password
              <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
            </label>
          </div>
          <Button className="bg-blue-500 ml-28"><Link to="/signup">SIGN UP</Link></Button>
        </form>
        <p className="text-white p-4">
          Already have an account?
          <span><Link to="/login">SIGN IN</Link></span>
        </p>
      </div>
    </div>
  );
}
