/* eslint-disable */
import { PRODUCT_ADDED , RENTED_PRODUCTS_FETCHED, RENTED_REMOVED_ITEM, RENTED_REMOVE_ITEM_ERROR, CLEAR_RENTED_ITEAM } from '../constants/actionTypes';

const initialState = {
  rentedItems: [],
  error: null,
};
export const renteditemReducer = (state = {initialState:[]}, action) => {
  switch (action.type) {
    case RENTED_PRODUCTS_FETCHED:
      return {
        ...state,
        rentedItems: action.payload
      };
    
    case RENTED_REMOVED_ITEM:
      return {
        ...state,
        rentedItems: state.rentedItems.filter((x)=>{
          return x._id !== action.payload
        }),
        error:null
      }
    
    case RENTED_REMOVE_ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_RENTED_ITEAM:
      return{
        ...state,rentedItems:[]
      }

    default:
      return state;
  }
}