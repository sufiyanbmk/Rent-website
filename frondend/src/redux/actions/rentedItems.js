/* eslint-disable */
import axios from '../../Axios/axios'
import {RENTED_PRODUCTS_FETCHED} from '../../constants/actionTypes'

export const rentedProuducts = (id) => async(dispatch) =>{
  console.log('enterrre')
  try{
    const { data } = await axios.get(`/product/get-renteditem/${id}`);
   dispatch({ type: RENTED_PRODUCTS_FETCHED, payload: data });
  
  }catch(err){
    console.log(err)
  }
  
}