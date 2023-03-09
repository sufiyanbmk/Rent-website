import React from 'react';
import TopSection from './topSection';
import Selector from '../../components/Selector';
import Button from '../../components/Button';

function Home() {
  return (
    <div>
      <TopSection />
      <div className="flex ml-20">
        <Selector type="state" url="https://cdn-api.co-vin.in/api/v2/admin/location/states" />
        <Selector type="country" url="https://restcountries.com/v2/all?fields=name" />
        <Button className="bg-blue-500 h-12 ml-12">Search</Button>
      </div>
    </div>
  );
}

export default Home;
