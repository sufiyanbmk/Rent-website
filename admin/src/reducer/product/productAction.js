/* eslint-disable */
import axios from 'axios';

export const fetchDataRequest = () => {
  return {
    type: 'FETCH_DATA_REQUEST',
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    axios.get('http://localhost:8000/products') 
      .then((response) => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};