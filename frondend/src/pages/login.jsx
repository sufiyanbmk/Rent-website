/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import loginImg from '../assets/images/login.jpg';
import useLoginForm from '../hooks/useLoginForm';
import { BASE_URL } from '../utils/config';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
// import Modal from '../components/modal';

export default function Login() {
  // const [credential, setCredential] = useState({
  //   email: undefined,
  //   password: undefined,
  // });
  // const handleChange = e => {
  //   setCredential(prev => ({...prev, [e.target.id]: e.target.value}))
  // }
  const { handleChange, values, errors } = useLoginForm()
  const navigate = useNavigate()
  // const { dispatch } = useContext(AuthContext)
  const handleClick = async e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      // dispatch({ type: 'LOGIN_START' })
      try {
        const res = await fetch(`${BASE_URL}login`, {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(values)
        })
        const result = await res.json()
        if (!res.ok) {
          alert(result.message)
          navigate('/login')
          return
        }
        console.log(result.data)
        dispatch({ type: 'AUTH', data: result })
        navigate('/')
      } catch (err) {
        console.log(err)
        // dispatch({ type: 'LOGIN_FAILED', payload: err.message })
      }
    }
  }
  // const [googleValue,setGoogleValue]= useState('')
  // const googleClick = () => {
  //   signInWithPopup(auth,provider).then((data)=>{
  //     setGoogleValue(data.user.email);
  //     localStorage.setItem("email",data.user.email)
  //   })
  // }
  // useEffect(()=>{
  //   setGoogleValue(localStorage.getItem('email'))
  // })
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch()
  const login = useGoogleLogin({
    onSuccess: async respose => {
      const token = respose.access_token
      console.log(token)
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        try {
          dispatch({ type: 'AUTH', data: { res, token } })
          navigate('/')
        } catch (error) {
          console.log(error);
        }
      } catch (err) {
        console.log(err)
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
            {errors.password && <p className='text-red-700'>{errors.password}</p>}
          </div>
          <Button className="bg-blue-700 ml-28 mt-6" type='submit'>LOGIN IN</Button>

        </form>
        <p className="text-white p-4 md:ml-44">
          Don&#39;t have an account?
          <span className='text-blue-700 p-2'><Link to="/signup">Create Account</Link></span>
        </p>
        <button className='inline-flex md:ml-60 w-72 items-center px-9 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150' onClick={login} ><FcGoogle /><span className='ml-2'>continue with google</span></button>

        {/* <Modal /> */}
        {/* <GoogleLogin
          onSuccess={credentialResponse => {
            // console.log(credentialResponse.credential);
            var decoded = jwt_decode(credentialResponse.credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }} /> */}
      </div>
    </div>
  );
}
