/* eslint-disable */
import axios from "../../Axios/axios";
import { RENTED_PRODUCTS_FETCHED, RENTED_REMOVED_ITEM, RENTED_REMOVE_ITEM_ERROR, CLEAR_RENTED_ITEAM } from "../constants/actionTypes";

export const listRentedItem = (id) => async (dispatch) => {
  try {
    await axios.get(`/products/rented-products/${id}`).then((res) => {
      dispatch({ type: RENTED_PRODUCTS_FETCHED, payload: res.data });
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeFromRentedItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/rented-products/${id}`).then((res)=>{
      dispatch({
        type: RENTED_REMOVED_ITEM,
        payload: id,
      })
    })
  } catch (err) {
    dispatch({
      type: RENTED_REMOVE_ITEM_ERROR,
      payload: err.message,
    });
    throw err;
  }
};

export const ClearRentedItem = () => ({
  type:CLEAR_RENTED_ITEAM
})