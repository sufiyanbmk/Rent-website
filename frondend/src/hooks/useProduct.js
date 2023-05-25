/* eslint-disable */
import { useState, useEffect } from "react";

const usePosts = (pageNum = 1, url, values, isFilter, check) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [isStart, setIsStart] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  useEffect(() => {
    setFilteredResults([]);
  }, [isFilter]);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;
    url(values, pageNum, { signal })
      .then((data) => {
        const products = data.data;
        console.log(products,'dddddddddd')
        // console.log(products,'produsctsssssssssssssssssssssssssssssss')
        if (isFilter) {
          // setResults([])
          console.log(products,'resultssssssssssssssssssssssssssddddddddds')
          if(check && isStart){
            console.log(products,"filter2");
            setFilteredResults([...products]);
            setIsStart(true)
          }else{
            console.log(products,"filterrrrrrrrrr");
            setFilteredResults([...filteredResults, ...products]);
          }
          setHasNextPage(Boolean(products.length));
        } else {
          setResults([...results, ...products]);
          console.log(results,'productssssssssssssswithresults')
          setHasNextPage(Boolean(products.length));
        }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum, url, values]);
  console.log(filteredResults,'filtered')
  return {
    isLoading,
    isError,
    error,
    results: isFilter ? filteredResults : results,
    hasNextPage,
  };
};

export default usePosts;
