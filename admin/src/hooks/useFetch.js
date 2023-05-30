/* eslint-disable */
import { useState, useEffect } from "react";
import axios from '../axios/axios'

const useFetch = (url) => {
  const [result,setResult] = useState([])
  const [error,setError]= useState(null)
  const [loading,setLoading]=useState(false)

  const fetchData = async()=>{
    setLoading(true)
    try{
      const {data} = await axios.get(url);
      setResult(data)
    }catch(err){
      setError('Failed To Fetch')
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[url])
  const refetch = () => {
    fetchData();
  };
  return {
    result,
    error,
    loading,
    refetch
  }
}

export default useFetch;