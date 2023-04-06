/* eslint-disable */
import axios from "../../Axios/axios";
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_REQUEST, GET_CATEGORIES_FAILURE } from "../constants/actionTypes";

export const getCatagory = () => async (dispatch) =>{
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    await axios.get('/admin/catagory').then((res) => {
       dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data.data });
        });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}