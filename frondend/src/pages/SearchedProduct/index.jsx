/* eslint-disable */
import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ProductList from './productList';
import searchedImg from '../../assets/images/frontImg.jpeg'
import useProduct from '../../hooks/useProduct';
// import { viewSearchedProduct } from '../../api/api'

import Filter from './filter'
import { viewSearchedProduct, searchByName, searchByCity, searchByPrice } from '../../api/api';

function searchedProduct() {
  const { state, catagory } = useParams()
  const [pageNum, setPageNum] = useState(0)
  const [isFilter, setIsFilter] = useState(false)
  const [product, setProduct] = useState()
  const [test, settest] = useState([])
  const [values, setValues] = useState({})
  const [isCheck, setIsCheck] = useState(false)
  const [url, setUrl] = useState(() => viewSearchedProduct)

  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage
  } = useProduct(pageNum, url, values, isFilter, isCheck)
  useEffect(() => {
    setValues({ state, catagory })
  }, [])
  useEffect(() => {
    setProduct(results)
  }, [results])

  const handleSearch = e => {
    const searchTerm = e.target.value;
    if (searchTerm.length === 0) {
      setPageNum(0)
      return setIsFilter(false)
    }
    setUrl(() => searchByName)
    setValues(searchTerm)
    setIsFilter(true)
  }
  const handleOnchange = e => {
    const searchTerm = e;
    setIsFilter(true)
    setUrl(() => searchByCity)
    setValues(searchTerm)
    setIsCheck(true)
  }

  const handlePriceSubmit = e => {
    e.preventDefault();
    const min = parseInt(e.target.elements.min.value);
    const max = parseInt(e.target.elements.max.value);
    const searchTerm = {min,max}
    setIsFilter(true)
    setUrl(() => searchByPrice)
    setValues(searchTerm)
    setIsCheck(true)
  }
  const intObserver = useRef()
  const lastPostRef = useCallback(post => {
    if (isLoading) return
    if (intObserver.current) intObserver.current.disconnect()
    intObserver.current = new IntersectionObserver(posts => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPageNum(prev => prev + 1)
      }
    })
    if (post) intObserver.current.observe(post)
  }, [isLoading, hasNextPage])

  // const { data, error, isLoading } = useFetchAxios(`/product/search-product/${state}/${catagory}`)

  if (isError) return <p className='center'>Error: {error.message}</p>

  const content = product?.map((product, i) => {
    if (results.length === i + 1) {
      return <ProductList ref={lastPostRef} key={product._id} data={product} />
    }
    return <ProductList key={product._id} data={product} />
  })


  return (
    <div className='grid grid-cols-1 py-32 md:grid-cols-1 w-full'>
      <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
            <h1 className='text-4xl lg:text-[58px] font-semibold leading-none mb-6' id='top'>
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
        <Filter handleSearch={handleSearch} handleCity={handleOnchange} handlePriceSubmit={handlePriceSubmit} />
      </section>
      {content}
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center"><a href="#top">Back to Top</a></p>
    </div>
  )
}

export default searchedProduct;
