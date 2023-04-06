/* eslint-disable */
import { combineReducers } from 'redux';
import authReducer from './auth';
import { renteditemReducer } from './rentedItemReducer';
import { categoryListReducer } from './catagoryReducer';

const reducers = combineReducers({ 
  userLogin: authReducer ,
  rentedItem: renteditemReducer,
  catagories: categoryListReducer
});

export default reducers;