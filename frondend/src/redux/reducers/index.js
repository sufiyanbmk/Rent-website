/* eslint-disable */
import { combineReducers } from 'redux';
import authReducer from './auth';
import { renteditemReducer } from './rentedItemReducer';
import { categoryListReducer } from './catagoryReducer';
import conversationReducer from './conversationReducer';
import audioCallReducer from './audioCallReducer';

const reducers = combineReducers({ 
  userLogin: authReducer ,
  rentedItem: renteditemReducer,
  catagories: categoryListReducer,
  conversation: conversationReducer,
  call:audioCallReducer,
});

export default reducers;