/* eslint-disable */
import React from "react";

const FirstForm = ({ formValues, onChange, option }) => {
  const { loading, categories, error } = option;
  return (
    <div>
      <form className="bg-white shadow-md  px-24 pt-16 pb-10 mb-8 rounded-md">
        <div className="grid gap-4 place-content-center items-center">
          <h1 className="text-gray-700 pb-8 font-bold text-2xl">Product Info</h1>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="Name"
          >
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 "
            id="productName"
            name="productName"
            type="text"
            placeholder="Enter the Name"
            onChange={onChange}
            value={formValues.productName}
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            onChange={onChange}
            value={formValues.price}
            type="number"
            placeholder="Enter the Price"
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Catagory
          </label>
          <select
            className="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            name="city"
            onChange={onChange}
            value={formValues.city}
          >
            <option value="">Select a category</option>
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.firstName}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Documents
          </label>
           <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="documents"
            name="documents"
            onChange={onChange}
            value={formValues.documents}
            placeholder="Cumpolsary Documents"
            rows="5" 
            cols="50" 
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            onChange={onChange}
            value={formValues.description}
            placeholder="Enter Description"
            rows="5"
            cols="50" 
          ></textarea>
        </div>
        <div className="flex items-center justify-between"></div>
      </form>
    </div>
  );
};

export default FirstForm;