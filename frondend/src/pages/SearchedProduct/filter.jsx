/* eslint-disable */
import { useEffect, useState, useRef, useCallback } from 'react'
import { RiSearch2Line } from 'react-icons/ri';
import Selector from "./selector";
import indianCities from 'indian-cities-json';
import useFilter from '../../hooks/useFilter';
import { searchByName } from '../../api/api';
import ProductList from './productList';

function Filter({handleSearch, handleCity, handlePriceSubmit}) {
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
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop:blur rounded-lg'>

          <div>
            <p className="text-teal-800 font-semibold">Search :</p>
            <div className="w-96 max-w-lg">
              <form>
                <div class="flex justify-between overflow-hidden rounded-md h-10 w-fit md:w-full  bg-white shadow shadow-black/20 ">
                  <input type="text" className="block flex-1  px-3 focus:outline-none" placeholder="Start Typing..." onChange={handleSearch} />
                  <span className="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                    <svg className="text-white" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z" /></svg>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div>
            <p className="text-teal-800 font-semibold">City :</p>
            <Selector data={cityData} selected={city} setSelected={handleCity} />
          </div>
          <div>
            {/* <p className="text-teal-800 font-semibold ">Price :</p>
            <Selector data={priceRange} selected={price} setSelected={handleOnchange} /> */}
            <form onSubmit={handlePriceSubmit}>
              <label>
                Minimum price:
                <input className='bg-red-300' name='min' type="number" value={priceRange.min} onChange={handlePriceRange} />
              </label>
              <label>
                Maximum price:
                <input type="number" name='max' value={priceRange.max} onChange={handlePriceRange} />
              </label>
              <button type='submit' disabled={!priceRange.min || !priceRange.max} ><RiSearch2Line /></button>
            </form>
          </div>
        </div>
  )
}

export default Filter