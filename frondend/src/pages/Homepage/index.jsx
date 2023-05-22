/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import TopSection from './topSection';
import Selector from '../../components/Selector';
import Button from '../../components/Button';
import WorkingStep from './bookingStep'
import AboutUs from './aboutUs'
import FeaturedProduct from './featuredProduct';

function Home() {
  const [state,setState]=useState("")
  const [catagory,setCatagory] = useState("")
  useEffect(()=>{
  },[state,catagory])
  return (
    <div>
      <TopSection />
      <div className="flex flex-col md:flex-row md:ml-20">
        <Selector type="state" url="https://cdn-api.co-vin.in/api/v2/admin/location/states" callback={(value)=>setState(value)} />
        <Selector type="country" url="http://localhost:8000/admin/catagory" callback={(value)=>setCatagory(value)}/>
        <Button className="bg-blue-500 h-12 md:ml-12 w-24 ml-32"><Link to={`/search-product/${state}/${catagory}`}>Search</Link></Button>
      </div>
      <FeaturedProduct />
      <WorkingStep />
      <AboutUs />
    </div>
  );
}

export default Home;
