/* eslint-disable */
import axios from '../Axios/axios'
import { useEffect, useState } from 'react';

function useFetchAxios(url) {
  console.log(url)
  const [data,setData] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false)
  useEffect(()=> {
    const fetchData = async()=>{
      setLoading(true)
      try {
        const res = await axios.get(url)
        if(!res.data.success){
          setError('failed to fetch')
          alert('Error occured')
        }
        // const rresult = await res.json()
        // console.log(rresult,'hiii')
        setData(res.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchData()
  },[url])

  return {
    data,
    error,
    loading
  }
}

export default useFetchAxios;