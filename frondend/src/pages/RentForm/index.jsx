/* eslint-disable */
import React, { useState } from "react";
import axios from '../../Axios/axios'
import FirstForm from "./firstForm";
import SecondForm from "./secondForm";
import ThirdForm from "./thirdForm";
import { useNavigate } from "react-router-dom";

const ParentComponent = () => {
  const formList = ["FirstForm", "SecondForm", "ThirdForm"];
  const navigate = useNavigate()

  const formLength = formList.length;

  const [page, setPage] = useState(0);
  const [images,setImage] = useState(null)
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

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
          ></SecondForm>
        );
      }
      case 2: {
        return <ThirdForm formValues={values} onChange={onChange} image ={handleFile}></ThirdForm>;
      }
      default:
        return null;
    }
  };
  const userId = user.data._id
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    images.forEach((image) => {
      formData.append("file", image);
    });
    formData.append('userId', userId)  
    await axios.post('/product/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res)=>{
      if(res.data.success){
        navigate('/rented-item')
      }
    }).catch((err)=>{
      console.log(err)
    })
};

  const onChange = (e) => {
    const {name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  };

  const handleFile = (e) => {
    console.log(e,'hiii')
    setImage(e)
  }

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
