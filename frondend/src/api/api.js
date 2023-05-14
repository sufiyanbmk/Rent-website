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
  return Axios.get(`/product/search-by-price?min=${values.min}&max=${values.max}&page=${page}`);
}

//featured 

export function getPublishKey(){
  return Axios.get(`/featured/config`)
}
 
export function stripePost(){
  return Axios.post(`/featured/create-payment-intent`)
}

export function updateToFeature(data){
  return Axios.patch(`/featured/update-feature`,data)
}

export function cancelIncompletePyment(id){
  console.log(id,'idkdkkd')
  return Axios.post('/featured/cancel-payment', {"paymentId":id})
}