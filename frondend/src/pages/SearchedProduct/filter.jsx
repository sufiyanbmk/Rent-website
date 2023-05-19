/* eslint-disable */
import { useEffect, useState, useRef, useCallback } from 'react'
import { RiSearch2Line } from 'react-icons/ri';
import Selector from "./selector";
import indianCities from 'indian-cities-json';
import useFilter from '../../hooks/useFilter';
import { searchByName } from '../../api/api';
import ProductList from './productList';

function Filter({ handleSearch, handleCity, handlePriceSubmit }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [city, setCity] = useState();
  const [filter, setFilter] = useState();

  const [pageNum, setPageNum] = useState(0)
  const cityData = indianCities.cities.filter(city => city.state === 'Kerala');

  const handlePriceRange = e => { 
    const { name, value } = e.target
    setPriceRange({ ...priceRange, [name]: value })
  }

  return (
    <div className='px-4 py-6 max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 lg:-top-4 lg:shadow-lg bg-white lg:bg-transparent lg:backdrop-blur rounded-lg'>

      <div>
        <p className="text-teal-800 font-semibold mb-2">Search:</p>
        <div className="w-full max-w-md">
          <form>
            <div className="relative rounded-md shadow-sm">
              <input type="text" className="block w-full pl-3 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm border-gray-300" placeholder="Start Typing..." onChange={handleSearch} />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.707 13.293a1 1 0 0 0-1.414-1.414l-1.147 1.147v-5.293a1 1 0 0 0-2 0v5.293l-1.147-1.147a1 1 0 0 0-1.414 1.414l2.586 2.586a1 1 0 0 0 1.414 0l2.586-2.586ZM9 16a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"></path></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <p className="text-teal-800 font-semibold mb-2">City:</p>
        <Selector data={cityData} selected={city} setSelected={handleCity} />
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-center max-w-[1170px] mx-auto bg-white lg:bg-transparent lg:backdrop-blur rounded-lg shadow-md lg:shadow-none">
        <div className="flex flex-col justify-center items-center lg:items-start">
          <p className="text-teal-800 font-semibold mb-2 lg:mb-0">Price Range:</p>
          <form onSubmit={handlePriceSubmit} className="flex justify-center lg:justify-start">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <label className="text-gray-600 lg:mr-2">
                Min:
                <input className="bg-gray-200 rounded-lg py-1 px-2 lg:mx-2" name="min" type="number" value={priceRange.min} onChange={handlePriceRange} />
              </label>
              <label className="text-gray-600 lg:mr-2">
                Max:
                <input className="bg-gray-200 rounded-lg py-1 px-2 lg:mx-2" name="max" type="number" value={priceRange.max} onChange={handlePriceRange} />
              </label>
              <button type="submit" disabled={!priceRange.min || !priceRange.max} className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
                <RiSearch2Line />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Filter