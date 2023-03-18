/* eslint-disable */
import { ConstructionOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data,setData] = useState([])
  const [error,setError]= useState(null)
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true)
      try{
        const res = await fetch(url)
        console.log(res)
        if(!res.ok){
          setError('faild')
          alert('failed')
          return
        }
        const result = await res.json()
        setData(result.data)
      }catch(err){
        setError('failed')
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

export default useFetch;