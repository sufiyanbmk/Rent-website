/* eslint-disable */
import React, { useState, useEffect } from "react";
import useFetchAxios from "../../hooks/useFetchAxios";
import ProductList from "../SearchedProduct/productList";

function FeaturedProduct() {
  const [productsToShow, setProductsToShow] = useState(3);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const { data, loading, error } = useFetchAxios(
    `/featured/home-product?limit=${productsToShow}`
  );
  const handleLoadMore = () => {
    setProductsToShow(productsToShow + 6); // Load 6 more products each time the button is clicked
  };
  useEffect(() => {
    if (data) {
      setLoadedProducts(data);
    }
  }, [data]);
  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="mt-44">
          <h1 className="text-3xl text-center p-8  lg:text-5xl text-blackfont-extrabold">
            Featured Product
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-16">
            {loadedProducts?.map((product) => (
              <ProductList key={product._id} data={product} />
            ))}
          </div>
          <button className="text-blue-700 bg-white py-2 px-4 rounded-md shadow-md my-4 mx-auto block">
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default FeaturedProduct;
