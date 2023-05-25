/* eslint-disable */
import axios from '../axios/axios';

export function getDashboardData(){
  return axios.get('/getAllDashboardData')
}

export function delteProduct(id){
  return axios.delete(`/removeProduct/${id}`)
}

export function productChart(){
  return axios.get('/product-graph')
}

export function userGraph(){
  return axios.get('/user-graph')
}

export function pieChartProduct(){
  return axios.get('/pie-chart')
}

export function addCatagory(values){
  return axios.post('/admin/catagory',values)
}