/* eslint-disable */
import React from 'react'
import useFetchAxios from '../../hooks/useFetchAxios'

function FeaturedProduct() {
  const {data,loading,error} = useFetchAxios('/product/home-featured')
  const product = data.data
  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {product?.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <figure className='w-full h-full'>
                <img src={product.links[0]} alt={product.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title uppercase">
                  {product.productName}
                  {product.featured && (
                    <div className="badge badge-secondary">Featured</div>
                  )}
                </h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    {product?.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FeaturedProduct