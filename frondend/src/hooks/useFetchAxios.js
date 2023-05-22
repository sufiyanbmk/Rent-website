/* eslint-disable */
import axios from '../Axios/axios'
import { useEffect, useState } from 'react';

function useFetchAxios(url) {
  const [data,setData] = useState([]);
  const [error,setError] = useState(null);
  const [isLoading,isSetLoading] = useState(false)
  useEffect(()=> {
    const fetchData = async()=>{
      isSetLoading(true)
      try {
        const res = await axios.get(url);
        if(!res.data.success){
          setError('failed to fetch')
          alert('Error occured')
        }
        setData(res.data)
        isSetLoading(false)
      } catch (err) {
        setError(err.message)
        isSetLoading(false)
      }
    }
    fetchData()
  },[url])

  return {
    data,
    error,
    isLoading
  }
}

export default useFetchAxios;