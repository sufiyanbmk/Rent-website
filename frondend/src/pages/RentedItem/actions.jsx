/*eslint-disable */
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { removeFromRentedItem } from '../../redux/actions/rentedItems';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';

function Actions({ proId, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const toggleDropdown = (proId) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [proId]: !prevState[proId],
    }));
  };

  const handleDelete = async (proId) => {
    setShowDeleteModal(true);
  };
  const handleDeleteModalConfirm = (proId) => { 
    toast.promise(dispatch(removeFromRentedItem(proId)), {
      loading: 'Deleting...',
      success: <b>Successfully removed product from rented items!</b>,
      successDuration: 7000,
      error: <b>Could not remove product from rented items.</b>,
    });
    setShowDeleteModal(false);
  };

  const handleEdit = (proId) => {
    navigate(`/rent-form?id=${proId}`)
  }
  return (
    <div className="flex justify-end px-4 pt-4">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
        onClick={() => toggleDropdown(proId)}
      >
        <BsThreeDots />
      </button>
      {isOpen[proId] && (
        <div className="z-50 mt-5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <p
              className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem" onClick={(e) => handleDelete(proId)}
            >
              Delete
            </p>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem" onClick={(e) => handleEdit(proId)}
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 3
            </a>
          </div>
          {/* modal  */}
          {showDeleteModal && (
            <DeleteModal
              onConfirm={() => handleDeleteModalConfirm(proId)}
              type='delete'
              onClose={()=>setShowDeleteModal(false)}
            />
          )}
        </div>
      )}
      <Toaster />
    </div>
  )
}

export default Actions;