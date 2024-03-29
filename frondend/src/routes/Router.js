import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Homepage';
import LoginPage from '../pages/login';
import Signup from '../pages/signup';
import ResetPassword from '../pages/resetPassword';
import VerifyEmail from '../pages/VerifyMail';
import OtpLogin from '../pages/OtpLogin';
import RentForm from '../pages/RentForm';
import RentedItem from '../pages/RentedItem';
import SingleProduct from '../pages/ProductDetail';
import SearchedProduct from '../pages/SearchedProduct';
import ViewProfile from '../pages/ViewProfile';
import FeatureTheProduct from '../pages/FeatureTheProduct';
import Conversation from '../pages/Conversation';
import { IsLogged } from '../auth/loginAuth';

function Routers() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-Password/:id/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:userId/:token" element={<VerifyEmail />} />
      <Route path="/otp-login/:mobile" element={<OtpLogin />} />
      <Route element={<IsLogged />}>
        <Route path="/rent-form" element={<RentForm />} />
        <Route path="/rented-item" element={<RentedItem />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/premium/:id" element={<FeatureTheProduct />} />
        <Route path="/conversation" element={<Conversation />} />
      </Route>
      <Route path="/product-detail/:id" element={<SingleProduct />} />
      <Route
        path="/search-product/:state/:catagory"
        element={<SearchedProduct />}
      />
    </Routes>
  );
}

export default Routers;
