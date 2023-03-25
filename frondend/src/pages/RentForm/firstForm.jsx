/* eslint-disable */
import React from "react";

const FirstForm = ({ formValues, onChange }) => {
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
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="catagory"
            name="catagory"
            onChange={onChange}
            value={formValues.catagory}
            type="text"
            placeholder="Select Catagory"
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Documents
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="documents"
            name="documents"
            onChange={onChange}
            value={formValues.documents}
            type="text"
            placeholder="Cumpolsary Documents"
          ></input>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="LastName"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            onChange={onChange}
            value={formValues.description}
            type="text"
            placeholder="Enter Description"
          ></input>
        </div>
        <div className="flex items-center justify-between"></div>
      </form>
    </div>
  );
};

export default FirstForm;