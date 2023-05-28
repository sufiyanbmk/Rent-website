/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import TopSection from './topSection';
import Button from '../../components/Button';
import WorkingStep from './bookingStep'
import AboutUs from './aboutUs'
import FeaturedProduct from './featuredProduct';
import Selector from '../../components/Selector';
import { useDispatch, useSelector } from "react-redux";
import { getCatagory } from '../../redux/actions/catagory'
import statesJson from '../../utils/indianStateData'

function Home() {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.catagories);
  const { loading, categories, error } = option;
  const [state,setState]=useState("")
  const [catagory,setCatagory] = useState("")

  const handleCatagory =(e) => {
    setCatagory(e)
  }
  const handleState = (e) =>{
    setState(e)
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
        <Selector data = {statesJson} property = {"name"} selected ={state} setSelected ={handleState} />
        <Selector data={categories} selected={catagory} property = {"title"} setSelected={handleCatagory}/>
        <Button className="bg-blue-500 h-12 md:ml-12 w-24 ml-32"><Link to={`/search-product/${state}/${catagory}`}>Search</Link></Button>
      </div>
      <FeaturedProduct />
      <WorkingStep />
      <AboutUs />
    </div>
  );
}

export default Home;
