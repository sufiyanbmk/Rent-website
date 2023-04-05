/* eslint-disable */
import React, { useState } from "react";
import axios from '../../Axios/axios';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { OtpLogin } from '../../redux/actions/authAction'

const otpLogin = () => {
  const {mobile } = useParams()
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [otpErr,setOtpErr] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(otp.join(""))
    const otpNumber = otp.join("")
    await axios.post('/verify-otp', {mobile,otpNumber}).then((res) => {
      if(res.data.status){
        console.log(res.data.user)
        dispatch(OtpLogin(res.data.user))
        navigate('/')
      }else{
        setOtpErr(res.data.msg)
      }
    })

  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 h-screen w-full">
        <div className="bg-gray-800 flex flex-col justify-center">
          <div className="row gap-1">
            <div className="col text-center">
              <p className="text-white p-9 text-3xl">Enter the OTP sent to you to verify your identity</p>

              {otp.map((data, index) => {
                return (
                  <input
                    className="otp-field w-16 ml-5 h-8"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}

              <p className="text-white p-5">OTP Entered - {otp.join("")}</p>
              <p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
                  onClick={e => setOtp([...otp.map(v => "")])}
                >
                  Clear
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
                  onClick={handleSubmit}
                >
                  Verify OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default otpLogin;
