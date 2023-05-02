/* eslint-disable */
import Axios from '../Axios/axios'

// product 
export function  viewSearchedProduct (values, page) {
  // console.log(values,'api values')
  const params = {
    state: values?.state,
    category: values?.catagory,
    page: page
  };
  // console.log(params,'valuess')
  const result = Axios.post('/product/search-product', params);
  return result;
}

export function searchByName(values,page){
  return Axios.get(`/product/search-by-name?name=${values}&page=${page}`);
}

export function searchByCity(values,page){
  return Axios.get(`/product/search-by-city?city=${values.name}&page=${page}`);
}

export function searchByPrice(values,page){
  console.log(values)
  return Axios.get(`/product/search-by-price?min=${values.min}&max=${values.max}&page=${page}`);
}