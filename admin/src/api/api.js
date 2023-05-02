/* eslint-disable */
import axios from '../axios/axios';

export function getDashboardData(){
  return axios.get('/getAllDashboardData')
}

export function delteProduct(id){
  return axios.delete(`/removeProduct/${id}`)
}