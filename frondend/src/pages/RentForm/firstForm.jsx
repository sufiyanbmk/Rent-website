/* eslint-disable */
import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';

const FirstForm = ({ formValues, onChange, option, Doc }) => {
  const { loading, categories, error } = option;
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = React.useState([
    { id: 'Thailand', text: 'Thailand' },
    { id: 'India', text: 'India' },
    { id: 'Vietnam', text: 'Vietnam' },
    { id: 'Turkey', text: 'Turkey' }
  ]);
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = tag => {
    setTags([...tags, tag]);
    Doc(tags)
  };
  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
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
            Title
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
            Fixed Price
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
            id="catagory"
            name="catagory"
            onChange={onChange}
            value={formValues.category}
          >
            <option value="">{formValues.catagory ? formValues.catagory :"Select a category"}</option>
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>{error}</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category.firstName}>
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
           <ReactTags
          tags={tags}
          // suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          value={formValues.tags}
          handleTagClick={handleTagClick}
          inputFieldPosition="top"
          autocomplete
        />
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