/* eslint-disable */
import { useState, useEffect } from "react";
import axios from '../axios/axios'

const useFetch = (url) => {
  const [result,setResult] = useState([])
  const [error,setError]= useState(null)
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true)
      try{
        const {data} = await axios.get(url);
        console.log(data,'dddfsf')
        if(!data.success){
          setError(data.message)
          return
        }
        setResult(data.data)
      }catch(err){
        setError('Failed To Fetch')
        setLoading(false)
      }
    }
    fetchData()
  },[url])
  return {
    result,
    error,
    loading
  }
}

export default useFetch;