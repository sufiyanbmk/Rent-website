/* eslint-disable */
import React, { useState } from 'react';
import useResetPassword from '../../hooks/useResetPassword';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from '../../Axios/axios'

function ResetPassword() {
  const { id, token } = useParams();
  const navigate = useNavigate()
  // const [exp, setExp] = useState(false);
  const { handleChange, values,errors } = useResetPassword()
  const pass = values.password
  const handleClick = async(e) =>{
    e.preventDefault()
    try{
      if(Object.keys(errors).length === 0){
        axios.put(`/reset-password/${id}/${token}`, { pass }).then(() => {
          navigate('/login');
        }).catch((error) => {
          console.log(error)
          // setExp(error.response.data.msg);
        });
      }
      else {
        // setErr(true);
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 h-screen w-full">
    <div className="bg-gray-800 flex flex-col justify-center">
      <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8" onSubmit={handleClick}>
      <h2 className="text-4xl dark:text-white font-bold text-center">RESET PASSWORD</h2>
      <div className="flex flex-col text-gray-400 py-2">
        <label htmlFor="email">
          Password
          <input onChange={handleChange} className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" name='password' required />
        </label>
        {errors.password && <p className='text-red-700'>{errors.password}</p>}
      </div>
      <div className="flex flex-col text-gray-400 py-2">
        {/* {showPassword ? <AiFillEyeInvisible className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} /> : <AiFillEye className='absolute ml-64 mt-5' onClick={togglePasswordVisibility} />} */}
        <label htmlFor="password">
          Re-Password
          <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type='password' name='confirm' onChange={handleChange} required />
        </label>
        {errors.confirm && <p className='text-red-700'>{errors.confirm}</p>}
      </div>
      <Button className="bg-blue-700 ml-28 mt-6" type='submit'>SUBMIT</Button>

    </form>
  </div>
  </div>
  )
}

export default ResetPassword;
