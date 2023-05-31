/* eslint-disable */
import axios from '../Axios/axios'
import { useEffect, useState } from 'react';

function useFetchAxios(url) {
  const [data,setData] = useState([]);
  const [error,setError] = useState(null);
  const [isLoading,isSetLoading] = useState(false)
  const fetchData = async()=>{
    isSetLoading(true)
    try {
      const res = await axios.get(url);
      setData(res.data)
      isSetLoading(false)
    } catch (err) {
      setError(err.message)
      isSetLoading(false)
    }
  }
  useEffect(()=> {
    fetchData()
  },[url])

  const refetch =()=>{
    fetchData()
  }

  return {
    data,
    error,
    isLoading,
    refetch
  }
}

export default useFetchAxios;