/* eslint-disable */
import React, { useState } from "react";
import { BASE_URL } from '../utils/config';
import axios from '../Axios/axios'

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = useState('')
  const [error, setErr] = useState({});
  const [msg, setMsg] = useState(null);
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post('/forgot-password', { email }).then((res) => {
        console.log(res)
        setMsg(res.data.msg);
      }).catch((err) => {
        setErr(err.response.data);
      });
    } catch (err) {
      console.log(err)
      // dispatch({ type: 'LOGIN_FAILED', payload: err.message })
    }
  }

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Forgot Password?
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
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
                <div className="bg-gray-800 flex flex-col justify-center">
                  <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
                    <h2 className="text-4xl dark:text-white font-bold text-center">Enter Email</h2>
                    <div className="flex flex-col text-gray-400 py-2">
                      <label htmlFor="email">
                        Email
                        <input onChange={handleChange} className="rounded-lg bg-gray-700 mt-2 p-2 ml-12 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" name='email' required />
                      </label>
                      {/* {errors.email && <p className='text-red-700'>{errors.email}</p>} */}
                    </div>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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