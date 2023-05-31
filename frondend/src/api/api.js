/* eslint-disable */
import Axios from '../Axios/axios'

export function sendOtpData(data){
  return Axios.post('/auth/otp-login',data)
}

export function forgotPassword(values){
  return Axios.post('/auth/forgot-password', { values })
}

// product 
export async function  viewSearchedProduct (values, page) {
  const params = {
    state: values?.state,
    catagory: values?.catagory,
    page: page
  };
  const result = await Axios.post('/products/searched-product', params);
  return result;
}

export async function searchByName(values,page){
  const state = values.state
  const catagory = values.catagory
  const name = values.name
  const result = await Axios.get(`/products/search-by-name?state=${state}&catagory=${catagory}&name=${name}&page=${page}`);
  // console.log(result,'resulttaxios')
  return result 
}

export function searchByCity(values,page){
  const state = values.state
  const catagory = values.catagory
  const city = values.name.name
  page = 0
  // alert(city)
  return Axios.get(`/products/search-by-city?state=${state}&catagory=${catagory}&city=${city}&page=${page}`);
}

export function searchByPrice(values,page){
  const state = values.state
  const catagory = values.catagory
  const min = values.name.min
  const max = values.name.max
  return Axios.get(`/products/search-by-price?state=${state}&catagory=${catagory}&min=${min}&max=${max}&page=${page}`);
}

export function sendReport(reportObj){
  return Axios.post(`/products/report`,reportObj)
}

export function sendReview(reviewObj){
  return Axios.post(`/products/review`, reviewObj)
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
  return Axios.post('/featured/cancel-payment', {"paymentId":id})
}

export function startAudioCall(to,from){
  return Axios.post('/call/start-call',{to,from})
}

export function generateZegoToken({userID,roomID}){
  console.log(userID,roomID)
  return Axios.post('/call/generate-zego-token',{ userId: userID, room_id: roomID,})
}

//users

export function profileImg(id,formData){
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  };
  return Axios.put(`/user/profile/${id}`,formData,config)
}