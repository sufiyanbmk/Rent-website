/* eslint-disable */
import axios from "../../Axios/axios";
import { RENTED_PRODUCTS_FETCHED, RENTED_REMOVED_ITEM } from "../constants/actionTypes";

export const listRentedItem = (id) => async (dispatch) => {
  try {
    await axios.get(`/product/rented-products/${id}`).then((res) => {
      dispatch({ type: RENTED_PRODUCTS_FETCHED, payload: res.data.data });
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeFromRentedItem = (id) => async (dispatch) => {
  try {
    if (window.confirm("Are you sure you want to delete this item?")) {
    await axios.delete(`/product/delete-product/${id}`).then((res)=>{
      dispatch({
        type: RENTED_REMOVED_ITEM,
        payload: id,
      })
    }).catch((err)=>{
      console.log(err)
    })
    }
  } catch (err) {
    console.log(err);
  }
};
