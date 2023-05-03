/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Profile from './profile';
import EditModal from './editModal';
import { useSelector } from 'react-redux';
import DeleteModal from '../../components/ConfirmModal'
import ImageCropModel from './imageModal';

function ViewProfile() {
  const [isEditModel, isSetEditModel] = useState(false)
  const [isDeleteModel, isSetDeleteModel] = useState(false)
  const [isImageModel, isSetImageModel] = useState(false)
  const userDetails = useSelector((state) => state.userLogin)

  const handleDeleteUser = () =>{
    console.log('hdiifdi')
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gradient-to-r from-blue-500'>
      <Profile isSetEditModel={isSetEditModel} isSetDeleteModel= {isSetDeleteModel} isSetImageModel={isSetImageModel}/>
      {isEditModel?<EditModal userDetails={userDetails} isSetEditModel={isSetEditModel} />:''}
      {isDeleteModel?<DeleteModal onConfirm={()=>handleDeleteUser()} onClose = {() => isSetDeleteModel(false)}/>:''}
      {isImageModel?<ImageCropModel showModal={isImageModel} setShowModal={isSetImageModel} id={userDetails.authData._id}/>:''}
    </div>
  )
}

export default ViewProfile;
