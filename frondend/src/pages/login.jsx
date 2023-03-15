/* eslint-disable */
import React, {useState, useContext, useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import loginImg from '../assets/images/login.jpg';
import useLoginForm from '../hooks/useLoginForm';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import {auth,provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth'

export default function Login() {
  // const [credential, setCredential] = useState({
  //   email: undefined,
  //   password: undefined,
  // });
  // const handleChange = e => {
  //   setCredential(prev => ({...prev, [e.target.id]: e.target.value}))
  // }
  const { handleChange, values,errors } = useLoginForm()
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  const handleClick = async e => {
    e.preventDefault();
    if(Object.keys(errors).length === 0){
    dispatch({type:'LOGIN_START'})
    try {
      const res = await fetch(`${BASE_URL}login`,{
        method:"post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(values)
      })
      const result = await res.json()
      if(!res.ok) alert(result.message)
      console.log(result.data)
      dispatch({type:'LOGIN_SUCCESS', payload:result.data})
      navigate('/')
    } catch (err) {
      dispatch({type:'LOGIN_FAILED', payload: err.message})
    }
  }else{
  }
  }
  const [googleValue,setGoogleValue]= useState('')
  const googleClick = () => {
    signInWithPopup(auth,provider).then((data)=>{
      setGoogleValue(data.user.email);
      localStorage.setItem("email",data.user.email)
    })
  }
  useEffect(()=>{
    setGoogleValue(localStorage.getItem('email'))
  })
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
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
          {showPassword?<AiFillEyeInvisible  className='absolute ml-64 mt-5' onClick={togglePasswordVisibility}/> :<AiFillEye  className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} /> }
            <label htmlFor="password">
              Password
              <input  className="p-2 rounded-lg bg-gray-700 mt-2 ml-5 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} required />
            </label>
            {errors.password && <p className='text-red-700'>{errors.password}</p>}
          </div>
          <Button className="bg-blue-700 ml-28 mt-6" type='submit'>LOGIN IN</Button>
        </form>
        <p className="text-white p-4 md:ml-40">
          Don&#39;t have an account?
          <span className='text-blue-700 p-3'><Link to="/signup">Create Account</Link></span>
        </p>
        <button onClick={googleClick}>sign in google</button>
      </div>
    </div>
  );
}
