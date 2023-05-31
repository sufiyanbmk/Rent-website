/* eslint-disable */
import { useState } from "react";
import useSignupForm from '../../hooks/useSignupForm';
import axios from '../../Axios/axios';
import { useDispatch } from 'react-redux';
import { EditProfileUpdate } from '../../redux/actions/authAction'

export default function EditModal({userDetails,isSetEditModel}) {
  const user = userDetails.authData
  const [showModal, setShowModal] = useState(true);
  const [isPassword, setIsassword] = useState(false);
  const { handleChange, values, errors } = useSignupForm()
  const dispatch = useDispatch()
  const handleClick = async e => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      axios.patch(`/user/profile/${user._id}`, values).then((res) => {
        dispatch(EditProfileUpdate(values))
        // navigate('/')
        isSetEditModel(false)
      }).catch((err) => {
        console.log(err, 'err')
        // setErr(err.response.data)
      })
    } else {
      setErr({ message: "Password is Incorrect" })
    }
  }
  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        EDIT USER
      </button> */}
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
                    {isPassword ? 'Edit Password': 'Edit Profile' }
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
                <div className="bg-gray-800 flex flex-col justify-center ">
                  <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"  onSubmit={handleClick}>
                    <h2 className="text-4xl dark:text-white font-bold text-center"></h2>
                    <div className="flex flex-col text-gray-400 py-2">
                      <label htmlFor="email">
                        {isPassword ? 'Old password' :'Username' }
                        {isPassword ? 
                        <input className="p-2 rounded-lg bg-gray-700 mt-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type='password' name='password' required onChange={handleChange} />
                        : 
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-6 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" required name='username' defaultValue={user.userName} onChange={handleChange} />
                        }
                      </label>
                      {errors.userName && <p className='text-red-700'>{errors.userName}</p>}
                    </div>
                    <div className="flex flex-col text-gray-400 py-2">
                      <label htmlFor="email">
                        Email
                        <input className="rounded-lg bg-gray-700 mt-2 p-2 ml-14 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" name='email' required onChange={handleChange} defaultValue={user.email} />
                      </label>
                      {errors.email && <p className='text-red-700'>{errors.email}</p>}
                    </div>
                    <button className="text-white bg-blue-500 ml-48 mt-7 px-4 py-2 rounded-lg shadow-md">Submit</button>
                  </form>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => isSetEditModel(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsassword((prevIsSignup) => !prevIsSignup)}
                  >
                    {isPassword?'Change Profile' :'Change Password'}
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