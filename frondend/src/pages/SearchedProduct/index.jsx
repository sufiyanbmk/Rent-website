/* eslint-disable */
import React from 'react'
import { useParams } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';

function searchedProduct() {
  const {state, catagory} = useParams()
  
  const { data: data } = useFetchAxios(`/product/search-product/${state}/${catagory}`)
  return (
    <div>
      hii
    </div>
  )
}

export default searchedProduct;
