/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import TopSection from './topSection';
import Selector from '../../components/Selector';
import Button from '../../components/Button';
import WorkingStep from './bookingStep'
import AboutUs from './aboutUs'
import FeaturedProduct from './featuredProduct';
import Selectorr from '../SearchedProduct/selector';
import { useDispatch, useSelector } from "react-redux";
import { getCatagory } from '../../redux/actions/catagory'

function Home() {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.catagories);
  const { loading, categories, error } = option;
  const [state,setState]=useState("")
  const [catagory,setCatagory] = useState("")

  const handleCatagory =(e) => {
    console.log(e.title,'eeeeeeee')
    const searchTerm = e.title
    setCatagory(searchTerm)
  }

  useEffect(()=>{
  },[state,catagory])
  useEffect(()=>{
    dispatch(getCatagory())
},[dispatch]);
  return (
    <div>
      <TopSection />
      <div className="flex flex-col md:flex-row md:ml-20">
        <Selector type="state" url="https://cdn-api.co-vin.in/api/v2/admin/location/states" callback={(value)=>setState(value)} />
        {/* <Selector type="country" url="http://localhost:7000/api/admin/catagory" callback={(value)=>setCatagory(value)}/> */}
        <Selectorr data={categories} selected={catagory} setSelected={handleCatagory}/>
        <Button className="bg-blue-500 h-12 md:ml-12 w-24 ml-32"><Link to={`/search-product/${state}/${catagory}`}>Search</Link></Button>
      </div>
      <FeaturedProduct />
      <WorkingStep />
      <AboutUs />
    </div>
  );
}

export default Home;
