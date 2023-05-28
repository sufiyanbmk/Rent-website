/* eslint-disable */
import React from 'react'
import useFetchAxios from '../../hooks/useFetchAxios'
import ProductList from '../SearchedProduct/productList';

function FeaturedProduct() {
  const {data,loading,error} = useFetchAxios('/featured/home-product')
  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <h1 className='text-3xl text-center p-8  lg:text-5xl text-blackfont-extrabold'>Featured Product</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.map((product) => (
            <ProductList key={product._id} data={product} />
            // <div key={product._id} className="card bg-base-100 shadow-xl">
            //   <figure className='w-full h-full'>
            //     <img src={product.link[0]} alt={product.name} />
            //   </figure>
            //   <div className="card-body">
            //     <h2 className="card-title uppercase">
            //       {product.productName}
            //       {product.featured && (
            //         <div className="badge badge-secondary">Featured</div>
            //       )}
            //     </h2>
            //     <p>{product.description}</p>
            //     <div className="card-actions justify-end">
            //         {product?.category}
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
        </>
      )}
    </>
  );
}

export default FeaturedProduct