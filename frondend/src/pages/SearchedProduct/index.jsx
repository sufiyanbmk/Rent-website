/* eslint-disable */
import React from 'react'
import { useParams } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';
import TopSection from './topSection';
import ProductList from './productList';

function searchedProduct() {
  const {state, catagory} = useParams()
  const { data: data } = useFetchAxios(`/product/search-product/${state}/${catagory}`)
  // console.log(data.data,'data')
  return (
    <div className='grid grid-cols-1 py-32 md:grid-cols-1 w-full'>
      <TopSection />
      <ProductList data={data}/>
    </div>
  )
}

export default searchedProduct;
