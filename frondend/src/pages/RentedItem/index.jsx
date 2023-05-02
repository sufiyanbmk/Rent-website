/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from '../../Axios/axios'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { listRentedItem, removeFromRentedItem } from '../../redux/actions/rentedItems';
import Actions from './actions';

function rentedItems() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const {rentedItems,error} = useSelector((state) => state.rentedItem);
  const dispatch = useDispatch();

  const userId = user._id
  useEffect(() => {
    dispatch(listRentedItem(userId))
  }, [dispatch]);


  return (
    <div className='pt-28 px-8'>
      {rentedItems?.length === 0 ? <div className='h-screen'>NO products avaliable </div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rentedItems?.map((product, index) => (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Actions proId={product._id} error = {error}/>
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
      }
    </div>
  )
}

export default rentedItems;
