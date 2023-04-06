/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from '../../Axios/axios'
import FirstForm from "./firstForm";
import SecondForm from "./secondForm";
import ThirdForm from "./thirdForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCatagory } from '../../redux/actions/catagory'

const ParentComponent = () => {
  const formList = ["FirstForm", "SecondForm", "ThirdForm"];
  const navigate = useNavigate()
  const formLength = formList.length;
  const [page, setPage] = useState(0);
  const [images,setImage] = useState(null)
  console.log(images,'immmmmmmmmmmm')
  const userInfo = useSelector((state) => state.userLogin)
  const userId = userInfo.authData._id
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCatagory())
},[dispatch]);

const opitons = useSelector((state) => state.catagories);
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
  const handleForms = () => {
    switch (page) {
      case 0: {
        return (
          <div>
            <FirstForm formValues={values} onChange={onChange} option={opitons}></FirstForm>
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    images.forEach((image) => {
      console.log('h--------------------------')
      console.log(image,'image')
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
    setImage(e)
  }

  return (
    <div className="md:p-12 p-4"> 
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
