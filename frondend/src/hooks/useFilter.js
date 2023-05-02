/* eslint-disable */
import { useState, useEffect } from 'react'

const usePosts = (pageNum = 1,Url,value) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)
    
    useEffect(() => {
      setIsLoading(true)
      setIsError(false)
      setError({})
      
      const controller = new AbortController()
      const { signal } = controller
      console.log('sdffsf')
        Url(value,pageNum, { signal })
            .then(data => {
              const products = data.data.data
                setResults([...results,...products]);
                setHasNextPage(Boolean(products.length))
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [pageNum,value])
    return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts