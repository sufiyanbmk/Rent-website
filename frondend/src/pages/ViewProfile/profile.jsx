/* eslint-disable */
import { useState } from 'react'
import image from '../../assets/images/profileAvator.jpg';
import EditModal from './editModal';
import ImageChangeModal from './imageModal';
import { useSelector } from 'react-redux';

function Profile() {
  const [isdropdownVisible, isSetDropdownVisible] = useState(false);
  const [isImagecrop,isSetImagecrop ] = useState(false)
  const userDetails = useSelector((state) => state.userLogin)

  const handleDropdown = () =>{
    isSetDropdownVisible(!isdropdownVisible);
  }
  const handleCropModal = () =>{
    isSetImagecrop(true)
  }
  return (
    <div className='hover:scale-125 transition-all duration-500 bg-white rounded-xl shadow-2xl p-16 flex flex-col items-center'>
      <div className=''>
      {isImagecrop && <ImageChangeModal showModal={isImagecrop} setShowModal ={isSetImagecrop} id= {userDetails.authData._id}></ImageChangeModal>}
        <img src={userDetails.authData.Imglink ? userDetails.authData.Imglink : image} alt='image' className='h-24 ring-2 ring-offset-2 rounded-full cursor-pointer' onClick={handleDropdown}/>
        <div className={`absolute ${isdropdownVisible ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCropModal}>Add Profile Image</button>
            </li>
          </ul>
          <div class="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </div>
        </div>
      </div>
      <div id='title' className='text-black font-bold text-xl mt-4'>{userDetails.authData.username}</div>
      <div id='subtitle' className='text-sm text-gray-600'>{userDetails.authData.email}</div>
      <div className='flex justify-between items-center my-6 gap-4 text-sm'>
        <div className='flex flex-col items-center  font-semibold'>
          <div className='text-indigo-500 font-bold'>172</div>
          <div className='text-indigo-400'>Products</div>
        </div>
        <div className='flex flex-col items-center  font-semibold'>
          <div className='text-indigo-500 font-bold'>172</div>
          <div className='text-indigo-400'>Products</div>
        </div>
      </div>
      <div id='actions' className='flex justify-center items-center'>
        <EditModal user={userDetails} />
        <div><button className='mr-4 focus:ring-2 ring-offset-2 ring-pink-600 bg-indigo-500 text-white p-2 px-4 rounded-md '>EDIT</button></div>
        <div><button className='focus:ring-2 ring-offset-2 ring-pink-600 bg-red-500 text-white p-2 px-4 rounded-md'>Delete Account</button></div>
      </div>
    </div>
  )
}

export default Profile;
