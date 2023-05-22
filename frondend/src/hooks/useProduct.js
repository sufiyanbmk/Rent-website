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
        const products = data.data.data;
        // console.log(products,'produsctsssssssssssssssssssssssssssssss')
        // console.log(results,'resultsssssssssssssssssss')
        if (isFilter) {
          // console.log(filteredResults,"filter");
          // console.log(products,"filter2");
          if(check && isStart){
            setFilteredResults([...products]);
            setIsStart(true)
          }else{
            setFilteredResults([...filteredResults, ...products]);
          }
          setHasNextPage(Boolean(products.length));
        } else {
          // console.log("isproduct")
          setResults([...results, ...products]);
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
  return {
    isLoading,
    isError,
    error,
    results: isFilter ? filteredResults : results,
    hasNextPage,
  };
};

export default usePosts;
