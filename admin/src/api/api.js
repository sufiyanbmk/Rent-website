/* eslint-disable */
import axios from '../axios/axios';

export function loginAdmin(value){
  return axios.post('/auth/admin-login',value)
}

export function blockandUnblock(email,block){
  return axios.put('/admin/users',{email, block})
}

export function getDashboardData(){
  return axios.get('/admin/getAllDashboardData')
}

export function delteProduct(id){
  return axios.delete(`/admin/removeProduct/${id}`)
}

export function productChart(){
  return axios.get('/admin/product-graph')
}

export function userGraph(){
  return axios.get('/admin/user-graph')
}

export function pieChartProduct(){
  return axios.get('/admin/pie-chart')
}

export function addCatagory(values){
  return axios.post('/admin/catagory',values)
}

export function deleteCatagory(id){
  return axios.delete(`/admin/catagory/${id}`)
}