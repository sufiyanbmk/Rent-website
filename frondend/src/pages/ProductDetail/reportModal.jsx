/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from '../../Axios/axios';
import { useSelector } from 'react-redux';
import toast ,{Toaster} from 'react-hot-toast';

const Modal = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setform] = useState(false);
  const [report, setReport] = useState('');
  const LoggedInUser = useSelector((state) => state.userLogin)
  const userInfo = LoggedInUser.authData
  const handleReport = async (reportType) => {
    console.log(reportType)
    const reportObj = {
      userId: userInfo._id,
      username: userInfo.username,
      report: reportType,
    }
    try {
      const {data} = await axios.post(`/report/${id}`, reportObj)
      console.log(data)
      if(data.success){
        toast.success('Reported SuccessFully')
      }else{
        toast.error('You Already Reported')
      }
      setTimeout(() => {
        setShowModal(false)
      }, 2000);
    } catch (err) {
      toast.error('Error Occured')
      console.log(err)
    }
  }
return (
  <>
    <button
      className="bg-blue-200 text-red-700 active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Report ?
    </button>
    {showModal ? (
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Reason</h3>

              </div>
              <div className="relative p-6 flex-auto">
                {!form ? (
                  <>
                    <button className="bg-gray-200 shadow-md rounded w-full outline-0 mt-5" onClick={() => handleReport('Scam')}>Scam</button>
                    <button className="bg-gray-200 shadow-md rounded w-full outline-0 mt-5" onClick={() => handleReport('Illegal')}>Illegal</button>
                    <button className="bg-gray-200 shadow-md rounded w-full outline-0 mt-5" onClick={() => handleReport('Scam')}>Exploit</button>
                    <button className="bg-gray-200 shadow-md rounded w-full outline-0 mt-5" onClick={() => handleReport('Privacy')}>Pirvacy</button>
                    <button className="bg-gray-200 shadow-md rounded w-full outline-0 mt-5" onClick={() =>setform(true)}>Others</button>
                  </>
                ) : 
                <form className={`bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full {!form ? hidden: show}`}>
                    <label className="block text-black text-sm font-bold mb-1">
                      Reason
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form> 
                }
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                {!form?'':
                <button
                  className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Submit
                </button>}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null}
    <Toaster />
  </>
);
};

export default Modal;