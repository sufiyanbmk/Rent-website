/* eslint-disable */
import { combineReducers } from 'redux';
import auth from './auth';
import { renteditemReducer } from './rentedItemReducer';

export const reducers = combineReducers({ 
  auth ,
  rentedItem: renteditemReducer
});