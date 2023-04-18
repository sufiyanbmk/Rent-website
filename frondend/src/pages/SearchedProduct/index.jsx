/* eslint-disable */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetchAxios from '../../hooks/useFetchAxios';
import ProductList from './productList';
import { RiSearch2Line } from 'react-icons/ri';
import indianCities from 'indian-cities-json';
import Selector from "./selector";
import searchedImg from '../../assets/images/frontImg.jpeg'

function searchedProduct() {
  const { state, catagory } = useParams()
  const { data, error, isLoading } = useFetchAxios(`/product/search-product/${state}/${catagory}`)
  console.log(data)
  const [productsData, setProductsData] = useState()
  useEffect(() => {
    setProductsData(data.data)
  }, [data])
  const [city, setCity] = useState();
  const [price, setPrice] = useState();
  const [pageCount, setPageCount ] = useState(0)
  const [page,setPage] = useState(0)
  const cityData = indianCities.cities.filter(city => city.state === 'Kerala');
  const priceRange = [
    { name: '100-500' },
    { name: '500-1000' },
  ]
  useEffect(()=>{
    const pages = Math.ceil(5/4)
    setPageCount(pages)
  },[page])
  const handleSearch = e => {
    const searchTerm = e.target.value;
    const searchedProduct = data?.data.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProduct)
  }
  const handleOnchange = e => {
    const filteredProducts = data.data.filter((item) => item.city.toLowerCase() === e.name.toLowerCase());
    setProductsData(filteredProducts)
  }
  return (
    <div className='grid grid-cols-1 py-32 md:grid-cols-1 w-full'>
      <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
            <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6'>
              <span className='text-violet-700'
              >Rent</span> You can get the product here...</h1>
            <p className='max-w-[480px] mb-8'>
              this is the best product you can get................
            </p>
          </div>
          <div className='hidden flex-1 lg:flex justify-end items-end'>
            <img src={searchedImg} alt="" />
          </div>
        </div>
        <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop:blur rounded-lg'>
          {/* here selector  */}

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
            <Selector data={cityData} selected={city} setSelected={handleOnchange} />
          </div>
          <div>
            <p className="text-teal-800 font-semibold ">Price :</p>
            <Selector data={priceRange} selected={price} setSelected={setPrice} />
          </div>
        </div>
      </section>
      <ProductList data={productsData} />
      <div className="flex justify-center my-4">
        {Array.from({ length: pageCount }, (_, i) => (
          <span
            key={i}
            className="mx-2 px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
            onClick={() => setPage(i)}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}

export default searchedProduct;
