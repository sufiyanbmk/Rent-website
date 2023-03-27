/* eslint-disable */
import { PRODUCT_ADDED , RENTED_PRODUCTS_FETCHED } from '../constants/actionTypes';

export const renteditemReducer = (state = {products:[]}, action) => {
  switch (action.type) {
    // case PRODUCT_ADDED:
      // const item = action.payload;
      // const existingItemIndex = state.rentedItems.findIndex((x) => x.product === item.product);
      // if (existingItemIndex !== -1) {
      //   const updatedItems = [...state.rentedItems];
      //   updatedItems[existingItemIndex] = item;
      //   return {
      //     ...state,
      //     rentedItems: updatedItems
      //   };
      // } else {
        // return {
          // ...state,
          // rentedItems: [...state.rentedItems, item]
        // };
      // }
      case RENTED_PRODUCTS_FETCHED:
        return {
          ...state,
          rentedItems: action.payload
        };
      default:
      return state;
  }
}