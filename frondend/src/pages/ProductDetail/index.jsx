/* eslint-disable */
import React, {useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';
import MultipleImage from './multipleImg';
import Review from './review';

function productDetail() {
  const { id } = useParams()
  const { data: data } = useFetchAxios(`/product/product-detail/${id}`)
  const product = data.data
  return (
    <section className='px-16 py-28'>
      <div className='container mx-auto min-h-[800px] mb-14'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold'>{product?.productName}</h2>
            <h3 className='text-lg  mb-4'>{product?.address}</h3>
          </div>
          <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
            <div className='bg-green-500 text-white px-3 rounded-full'>{product?.catagory}</div>
            <div className='bg-violet-500 text-white px-3 rounded-full'>{product?.state}</div>
          </div>
          <div className='text-3xl font-semibold text-violet-600'>{product?.price}</div>
        </div>
        <div className='flex flex-row item-start gap-8 lg:flex'>
           <div className='max-w-[768px]'>
            {/* <div className='mb-8'>
              <img src ={product?.link} />
            </div>
            <div>
              <div>
                icon
              </div>
              <div>
                icon
              </div>
              <div>
                icon
              </div>
            </div>  */}
            <MultipleImage />
            <div>{product?.description}</div>
          </div>
          <div className='flex-1 bg-white-100 w-full mb-8 border border-gray-300 rounder-lg px-6 py-8'>
            <div className='flex items-center gap-x-4 mb-8'>
              <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                <img src='' alt="user picture" />
              </div>
              <div>
                <div className='font-bold text-lg'>product agent name</div>
                <Link to='' className='text-violet-500 text-sm' >View Profile</Link>
              </div>
            </div>
            {/* form  */}
            <form className='flex flex-col gap-y-4'>
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type='text' placeholder='name'/>
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type = 'text' placeholder='email'/>
              <input className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm' type = 'text' placeholder='phone'/>
              <textarea className='border border-gray-300 focus:border-violet-300 outline-none resize-none rounded w-full p-4 h-36 text-sm text-gray-400' placeholder='Message' defaultValue='HEllo I am Interested '/>
              <div className='flex gap-x-2'>
                <button className='bg-blue-700 hover:bg-blue-900 rounded text-white p-4 text-sm w-full transition'>Send Message</button>
                <button className='bg-black text-white hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full transition'>Call</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Review />
    </section>
  )
}

export default productDetail;