/* eslint-disable */
import React, { useState } from "react";
import axios from '../Axios/axios'
import { useNavigate } from "react-router-dom";
import useLoginForm from '../hooks/useLoginForm';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [error, setErr] = useState('');
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate()
  const switchMode = () => {
    setErr('')
    setIsOtp((prevIsSignup) => !prevIsSignup);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();   
    if(isOtp){
      try{
        await axios.post('/otp-login',{ values }).then((res)=>{
          if(res.data.status){
            navigate(`/otp-login/${res.data.mobile}`)
          }
        }).catch((err)=>{
          setErr(err.response.data)
        })
      }catch(err){
        console.log(err)
      }
    }else{
      try {
        axios.post('/forgot-password', { values }).then((res) => {
          console.log(res.data.data)
          setMsg(res.data);
        }).catch((err) => {
          setErr(err.response.data)
        });
      } catch (err) {
        setErr({message:"network error"})
      }
    }
    
  }
  const { handleChange, values, errors } = useLoginForm()
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <>
      <button
        className="bg-gray-900 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:w-96 md:ml-40"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Forgot Password?/Login With Otp
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isOtp?'Phn NO' : "Email"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {msg && <h1 className="text-green-700 font-bold">{msg.message}</h1>}
                {error && <h4 className="text-red-600">{error.message}</h4>}
                <div className="bg-gray-800 flex flex-col justify-center">
                  <form onSubmit={handleSubmit} className={`max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 {classes.form}`}>
                    <h2 className="text-4xl dark:text-white font-bold text-center">{isOtp?'Enter Phone NO':"Enter Email"}</h2>
                    <div className="flex flex-col text-gray-400 py-2">
                      {isOtp?<label htmlFor="email">
                        Phone NO
                        <input onChange={handleChange} className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="number" name='phone' required />
                        {errors.phone && <p className='text-red-700'>{errors.phone}</p>}
                      </label>:<label htmlFor="email">
                        Email
                        <input onChange={handleChange} className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" name='email' required />
                        {errors.email && <p className='text-red-700'>{errors.email}</p>}
                      </label>
                      }
                    </div>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button onClick={switchMode} className='bg-gray-800 text-white rounded px-6 py-3'>
                    {isOtp ? 'Forgot password' : "Login with Otp"}
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}