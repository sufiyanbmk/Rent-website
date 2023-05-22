/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import signupImg from '../assets/images/signup.jpg';
import useSignupForm from '../hooks/useSignupForm';
import axios from '../Axios/axios'
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Registor } from '../redux/actions/authAction'

export default function Signup() {
  const { handleChange, values, errors } = useSignupForm()
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState('')
  const email = values.email;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('/verify-email', { email });
        if (response.status === 200) {
          const res = await axios.post('/register', values);
          // const result = await res.json()
          if (!res.success) {
            setError({message:'Failed ,Please Try again'})
            navigate('/signup')
          }
          setError({message:'Please check Email to Verify'})
          navigate('/signup')
        } else {
          setError({message:'Email is not valid'})
        }
      } catch (err) {
        console.log(err)
        setError({message:'server is down'})
      }
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={signupImg} alt="" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center ">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8" onSubmit={handleSubmit}>
          <h2 className="text-4xl dark:text-white font-bold text-center">SIGN UP</h2>
        {error && <p className='text-red-700'>{error.message}</p>}
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Username
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" required name='username' onChange={handleChange} />
            </label>
            {errors.username && <p className='text-red-700'>{errors.username}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Email
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-14 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" name='email' required onChange={handleChange} />
            </label>
            {errors.email && <p className='text-red-700'>{errors.email}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Phone
              <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="number" name='phone' required onChange={handleChange} />
            </label>
            {errors.phone && <p className='text-red-700'>{errors.phone}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="password">
              Password
              <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type={showPassword ? 'text' : 'password'} name='password' required onChange={handleChange} />
            </label>
            {errors.password && <p className='text-red-700'>{errors.password}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            {showPassword ? <AiFillEyeInvisible className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} /> : <AiFillEye className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} />}
            <label htmlFor="password">
              Confirm
              <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-8 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type={showPassword ? 'text' : 'password'} name='confirm' required onChange={handleChange} />
            </label>
            {errors.confirm && <p className='text-red-700'>{errors.confirm}</p>}
          </div>
          <Button type='submit' className="bg-blue-700 ml-16 mt-6">Please Click To Verify Email</Button>
        </form>
        <p className="text-white p-4 md:ml-40">
          Already have an account?
          <span className='text-blue-700 p-3'><Link to="/login">SIGN IN</Link></span>
        </p>
      </div>
    </div>
  );
}
