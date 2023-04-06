/* eslint-disable */
import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_REQUEST, GET_CATEGORIES_FAILURE } from '../constants/actionTypes';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};
export const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
        error: null,
      };
    case GET_CATEGORIES_FAILURE:
      return {
        loading: false,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};