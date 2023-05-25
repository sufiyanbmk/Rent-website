/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import loginImg from '../assets/images/login.jpg';
import useLoginForm from '../hooks/useLoginForm';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import Modal from '../components/modal';
import axioss from '../Axios/axios'
import axios from 'axios';
import { Login } from '../redux/actions/authAction'

export default function LoginPage() {
  const { handleChange, values, errors } = useLoginForm()
  const [error, setErr] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      axioss.post('/auth/user-login', values).then((res) => {
        dispatch(Login(res.data.userDetails))
        navigate('/')
      }).catch((err) => {
        console.log(err.response.data, 'err')
        setErr(err.response.data)
      })
    } else {
      setErr({ message: "Password is Incorrect" })
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const login = useGoogleLogin({
    onSuccess: async respose => {
      const token = respose.access_token
      try {
        // const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        //   headers: {
        //     "Authorization": `Bearer ${token}`
        //   }
        // })
        axioss.post('/auth/sign-in-with-google', {token}).then((res) => {
          if(res.data.status === 'success'){
            dispatch(Login(res.data.userDetails))
            navigate('/')
          }
          }).catch((err) => {
            setErr({message:'Some error occured , try again later'})
          })
      }catch (error) {
        setErr({message:'Server is down,try again Later..'})
      }
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8" onSubmit={handleClick}>
          <h2 className="text-4xl dark:text-white font-bold text-center">LOGIN IN</h2>
          {error && <p className='text-red-700'>{error.message}</p>}
          <div className="flex flex-col text-gray-400 py-2">
            <label htmlFor="email">
              Email
              <input onChange={handleChange} className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" name='email' required />
            </label>
            {errors.email && <p className='text-red-700'>{errors.email}</p>}
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            {showPassword ? <AiFillEyeInvisible className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} /> : <AiFillEye className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} />}
            <label htmlFor="password">
              Password
              <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-5 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} required />
            </label>
          </div>
          <Button className="bg-blue-700 ml-28 mt-6" type='submit'>LOGIN IN</Button>

        </form>
        <p className="text-white p-4 md:ml-44">
          Don&#39;t have an account?
          <span className='text-blue-700 p-2'><Link to="/signup">Create Account</Link></span>
        </p>
        <button className='inline-flex md:ml-60 w-72 items-center px-9 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150' onClick={login} ><FcGoogle /><span className='ml-2'>continue with google</span></button>
        <div className='p-8'>
          <Modal />
        </div>
      </div>
    </div>
  );
}
