/* eslint-disable */
import React from 'react';
import TopSection from './topSection';
import Selector from '../../components/Selector';
import Button from '../../components/Button';
import WorkingStep from './bookingStep'
import AboutUs from './aboutUs'

function Home() {
  return (
    <div>
      <TopSection />
      <div className="flex flex-col md:flex-row md:ml-20">
        <Selector type="state" url="https://cdn-api.co-vin.in/api/v2/admin/location/states" />
        <Selector type="country" url="http://localhost:8000/admin/catagory" />
        <Button className="bg-blue-500 h-12 md:ml-12 w-24 ml-32">Search</Button>
      </div>
      <WorkingStep />
      <AboutUs />
    </div>
  );
}

export default Home;
