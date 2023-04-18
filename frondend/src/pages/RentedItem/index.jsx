/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from '../../Axios/axios'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { listRentedItem, removeFromRentedItem } from '../../redux/actions/rentedItems'

function rentedItems() {
  const datas = [];
  const [isOpen, setIsOpen] = useState(Array(datas.length).fill(false))
  const [product,setProduct] = useState('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const productList = useSelector((state) => state.rentedItem);
  const products =productList.rentedItems
  const dispatch = useDispatch();
  const toggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };
  const userId = user._id
  const navigate = useNavigate()

  useEffect(()=>{
      dispatch(listRentedItem(userId))
  },[dispatch]);

  const handleDelete = async(proId) => {
    dispatch(removeFromRentedItem(proId))
  }

  const handleEdit = (proId) => {
    navigate(`/rent-form?id=${proId}`)
  }
  return (
    <div className='pt-28 px-8'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product, index) => (
          <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* drop down  */}
            <div className="flex justify-end px-4 pt-4">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                onClick={() => toggleDropdown(index)}
              >
                <BsThreeDots />
              </button>
              {isOpen[index] && (
                <div className=" z-50 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute left-36">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <p
                      className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem" onClick={ (e) => handleDelete(product._id)}
                    >
                      Delete
                    </p>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem" onClick={ (e)=> handleEdit(product._id) }
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
                </div>
              )}
            </div>
            <a href="#">
              <img className="p-8 rounded-t-lg object-fill md:w-full max-h-80" src={product.links[0]} alt="product image" />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.productName}</h5>
              </a>
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.category}</h5>
              </a>
              {/* <div className="flex items-center mt-2.5 mb-5">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={`/product-detail/${product._id}`}>View Product</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default rentedItems;
