/* eslint-disable */
import { combineReducers } from 'redux';
import authReducer from './auth';
import { renteditemReducer } from './rentedItemReducer';

const reducers = combineReducers({ 
  userLogin: authReducer ,
  rentedItem: renteditemReducer
});

export default reducers;