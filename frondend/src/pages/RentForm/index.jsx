/* eslint-disable */
import React, { useState } from "react";
import FirstForm from "./firstForm";
import SecondForm from "./secondForm";
import ThirdForm from "./thirdForm";

const ParentComponent = () => {
  const formList = ["FirstForm", "SecondForm", "ThirdForm"];

  const formLength = formList.length;

  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };
  const handleNext = () => {
    setPage(page === formLength - 1 ? 0 : page + 1);
  };

  const initialValues = {
    productName: "",
    price: "",
    catagory: "",
    documents: "",
    description: "",
    city: "",
    address: "",
    state: "",
    terms: "",
    image:""
  };
  const [values, setValues] = useState(initialValues);
  console.log(values)

  const handleForms = () => {
    switch (page) {
      case 0: {
        return (
          <div>
            <FirstForm formValues={values} onChange={onChange}></FirstForm>
          </div>
        );
      }
      case 1: {
        return (
          <SecondForm
            formValues={values}
            onChange={onChange}
            option={states}
          ></SecondForm>
        );
      }
      case 2: {
        return <ThirdForm formValues={values} onChange={onChange}></ThirdForm>;
      }
      default:
        return null;
    }
  };

  const states = [
    { id: "0", name: "Paris" },
    { id: "1", name: "London" },
    { id: "2", name: "Berlin" },
    { id: "3", name: "Warsaw" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await setTimeout(() => {
      console.log("form", values);
    }, 2000);
    return response;
  };

  const onChange = (e) => {
    const {name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="p-12 w-fit"> 
      <div className="flex-1">{handleForms()}</div>
      <div className="grid grid-cols-2 gap-4 place-content-center items-center">
        <button
          onClick={handlePrev}
          className="bg-blue-200  hover:bg-blue-300 rounded-md text-gray-800 font-bold py-2 px-4 disabled:bg-gray-400 "
          disabled={page === 0}
        >
          Prev
        </button>
        {page === 2 ? (
          <button
            onClick={handleSubmit}
            className="bg-blue-200 hover:bg-blue-300 rounded-md text-gray-800 font-bold py-2 px-4 "
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-200 hover:bg-blue-300 rounded-md text-gray-800 font-bold py-2 px-4 "
          >
            Next
          </button>
        )}
      </div>
      </div>
  );
};

export default ParentComponent;
