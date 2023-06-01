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
import { FaStar } from "react-icons/fa";

function rentedItems() {
  const { authData } = useSelector((state) => state.userLogin)
  const { rentedItems, error } = useSelector((state) => state.rentedItem);

  const dispatch = useDispatch();
  const userId = authData.id
  
  useEffect(() => {
    dispatch(listRentedItem(userId))
  }, [dispatch]);


  return (
    <div className='py-28 px-8'>
    {rentedItems?.length === 0 ? (
      <div className='h-screen'>
        <h2 className='text-red-800 text-center'>NO PRODUCTS AVAILABLE </h2>
      </div>
    ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {rentedItems?.map((product, index) => (
          <div
            key={product._id}
            className='bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl dark:bg-gray-800 dark:border-gray-700'
          >
            <Actions proId={product._id} error={error} />
            <div className='w-full h-64 overflow-hidden'>
              <img
                className='w-full h-full object-center object-cover'
                src={product?.link[0]}
                alt='product image'
              />
            </div>
            <div className='px-6 py-4'>
              <div className='mb-2'>
                <Link
                  to={`/product-detail/${product._id}`}
                  className='text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-500'
                >
                  {product.productName}
                </Link>
              </div>
              <div className='mb-4'>
                <span className='text-sm font-semibold text-gray-500 mr-2'>
                  Category:
                </span>
                
                <span className='text-sm text-gray-900 dark:text-white'>
                  {product.catagory}
                </span>
              </div>
              {product?.featured.length >= 1 ? <span className="badge badge-lg">FEATURED</span>:''}
              <div className='flex items-center justify-between'>
                <div className='text-xl font-bold text-gray-900 dark:text-white'>
                  ${product.price}
                </div>
                <button className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>
                  <Link to={`/product-detail/${product._id}`}>View Product</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  )
}

export default rentedItems;
