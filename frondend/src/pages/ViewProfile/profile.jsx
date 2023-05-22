/* eslint-disable */
import { useState } from 'react'
import image from '../../assets/images/profileAvator.jpg';
import ImageChangeModal from './imageModal';
import { useSelector } from 'react-redux';


function Profile({isSetEditModel,isSetDeleteModel,isSetImageModel}) {
  const [isdropdownVisible, isSetDropdownVisible] = useState(false);
  const [isImagecrop, isSetImagecrop] = useState(false)
  const userDetails = useSelector((state) => state.userLogin)

  const handleDropdown = () => {
    isSetDropdownVisible(!isdropdownVisible);
  }
  const handleCropModal = () => {
    isSetImagecrop(true)
  }
  return (
    <div className="hover:scale-110 transition-all duration-500 bg-white rounded-xl shadow-2xl p-8 md:p-16 flex flex-col items-center">
      <div>
        {/* {isImagecrop && <ImageChangeModal showModal={isImagecrop} setShowModal={isSetImagecrop} id={userDetails.authData._id} />} */}
        <img src={userDetails.authData.Imglink ? userDetails.authData.Imglink : image} alt="image" className="h-16 md:h-24 ring-2 ring-offset-2 rounded-full cursor-pointer" onClick={()=>isSetImageModel(true)} />
        <div className={`absolute ${isdropdownVisible ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCropModal}>Add Profile Image</button>
            </li>
          </ul>
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </div>
        </div>
      </div>
      <div id="title" className="text-black font-bold text-xl mt-4">{userDetails.authData.username}</div>
      <div id="subtitle" className="text-sm text-gray-600">{userDetails.authData.email}</div>
      <div className="flex justify-between items-center my-6 gap-4 text-sm">
        <div className="flex flex-col items-center font-semibold">
          <div className="text-indigo-500 font-bold">2</div>
          <div className="text-indigo-400">Products</div>
        </div>
        <div className="flex flex-col items-center font-semibold">
          <div className="text-indigo-500 font-bold">0</div>
          <div className="text-indigo-400">Liked</div>
        </div>
      </div>
      <div className="actions flex justify-center items-center gap-4">
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => isSetEditModel(true)}
      >
        EDIT USER
      </button>
      <button
        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => isSetDeleteModel(true)}
      >
        DELETE USER
      </button>
      </div>
    </div>
  )
}

export default Profile;
