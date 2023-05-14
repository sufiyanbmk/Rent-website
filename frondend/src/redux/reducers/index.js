/* eslint-disable */
import { combineReducers } from 'redux';
import authReducer from './auth';
import { renteditemReducer } from './rentedItemReducer';
import { categoryListReducer } from './catagoryReducer';
import conversationReducer from './conversationReducer';

const reducers = combineReducers({ 
  userLogin: authReducer ,
  rentedItem: renteditemReducer,
  catagories: categoryListReducer,
  conversation: conversationReducer
});

export default reducers;