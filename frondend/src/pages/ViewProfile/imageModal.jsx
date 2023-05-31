/* eslint-disable */
import React, { useState } from "react";
import Avatar from 'react-avatar-edit'
import axios from '../../Axios/axios'
import dataURLtoFile from "../../utils/dataURLtoFile";
import { useDispatch } from 'react-redux';
import { UpdateProfileimg } from '../../redux/actions/authAction';
import toast, { Toaster } from 'react-hot-toast';
import { profileImg } from "../../api/api";

export default function ImageChangeModal({ showModal, setShowModal, id }) {
  const [preview, setPreview] = useState(false);
  const [imageCrop, setImagecrop] = useState(false);
  const [profile, setProfile] = useState([])
  const [src, setSrc] = useState(false)
  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const onClose = () => {
    setPreview(null);
  }
  const onCrop = (view) => {
    setPreview(view)
  }
  const saveCropImage = async () => {
    setProfile([...profile, { preview }])
    const convertedUrltoFile = dataURLtoFile(preview,'cropped-image.jpeg')
    const formData = new FormData();
    formData.append('image', convertedUrltoFile);
    profileImg(id,formData).then((res) => {
      dispatch(UpdateProfileimg(res.data.data))
      toast.success('successfully Updated Img')
      setTimeout(() => {   
        setShowModal(false)
      }, 2000);
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
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
                    Select Profile Image
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Avatar
                    width={390}
                    height={295}
                    onCrop={onCrop}
                    onClose={onClose}
                    shadingColor={'#474649'}
                    backgroundColor={'#474649'}
                    src={src}
                  />
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
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={saveCropImage}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
       <Toaster />
    </>
  );
}