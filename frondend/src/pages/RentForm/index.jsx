/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from '../../Axios/axios'
import FirstForm from "./firstForm";
import SecondForm from "./secondForm";
import ThirdForm from "./thirdForm";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCatagory } from '../../redux/actions/catagory'
import queryString from 'query-string';
import toast, { Toaster } from 'react-hot-toast';

const ParentComponent = () => {
  const formList = ["FirstForm", "SecondForm", "ThirdForm"];
  const navigate = useNavigate()
  const formLength = formList.length;
  const [page, setPage] = useState(0);
  const [images,setImage] = useState(null)
  const userInfo = useSelector((state) => state.userLogin)
  const userId = userInfo.authData.id
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const productId = queryParams.id;
  const [errors, setErrors] = useState({});
    
  const firstValidateForm = () => {
    console.log(values.catagory,'cedsdf')
      let newErrors = {};
      if (!values.productName) {
        newErrors.name = 'Name is required';
      }
      if (!values.price) {
        newErrors.price = 'Price is required';
      } else if (isNaN(Number(values.price))) {
        newErrors.price = 'Price must be a number';
      }
      if (!values.description) {
        newErrors.description = 'Description is required';
      }
      if (!values.documents || values.documents.length < 3) {
        newErrors.documents = 'At least 3 documents are required';
      }
      if (!values.catagory) {
        newErrors.category = 'Category is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const secondValidateForm = () => {
      let newErrors = {};
      if (!values.address) {
        newErrors.address = 'Address is required';
      }
      if (!values.city) {
        newErrors.city = 'City is required';
      }
      if (!values.state) {
        newErrors.state = 'State is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    const thirdValidateForm = () => {
      let newErrors = {};
      if(!images){
        newErrors.image = 'image is required'
      }else if(images.length < 1){
        newErrors.image = 'Three image is required';
      }
      if(!values.terms){
        newErrors.terms = 'agree the terms and condition'
      } 
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    
  useEffect(()=>{
    dispatch(getCatagory())
},[dispatch]);

const opitons = useSelector((state) => state.catagories);
const editProduct = useSelector((state) => {
  const rentedItems = state.rentedItem.rentedItems || [];
  return rentedItems.find(product => product._id === productId);
});
  const handlePrev = () => {
    setPage(page === 0 ? formLength - 1 : page - 1);
  };
  const handleNext = () => {
    if(page === 0){
      const isValidate = firstValidateForm()
      if(isValidate){
        setPage(page === formLength - 1 ? 0 : page + 1);
      }
    }else if(page === 1){
      const isValidate = secondValidateForm()
      console.log(isValidate)
      if(isValidate){
        console.log(isValidate,'isval-----------')
        setPage(page === formLength - 1 ? 0 : page + 1);
      }
    }
  
  };
  let initialValues = {};
  if(productId){
    initialValues = {
      productName: editProduct.productName,
      price: editProduct.price,
      catagory: editProduct.catagory,
      documents: editProduct.documents,
      description: editProduct.description,
      city: editProduct.city,
      address: editProduct.address,
      state: editProduct.state,
      terms: "",
      link:editProduct.link, 
      image:editProduct.image
    };
  }else{
    initialValues = {
      productName: "",
      price: "",
      catagory: "",
      documents: [],
      description: "",
      city: "",
      address: "",
      state: "",
      terms: "",
      image:"",
      link:[],
    };
  }
  useEffect(()=>{
    if(!productId){
      setValues(initialValues)
    }
  },[productId])
  const [values, setValues] = useState(initialValues);
  
  const handleForms = () => {
    switch (page) {
      case 0: {
        return (
          <div>
            <FirstForm 
            formValues={values} 
            onChange={onChange} 
            option={opitons} 
            Doc = {setDoc}
            errors={errors}
            ></FirstForm>
          </div>
        );
      }
      case 1: {
        return (
          <SecondForm
            formValues={values}
            onChange={onChange}
            errors={errors}
          ></SecondForm>
        );
      }
      case 2: {
        return <ThirdForm 
          formValues={values} 
          onChange={onChange} 
          image ={handleFile}
          errors={errors}
          ></ThirdForm>;
      }
      default:
        return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = thirdValidateForm();
    if(isFormValid){
    const formData = new FormData();
    console.log(values,"values")
    formData.append("data", JSON.stringify(values));
    if(images !== null){
      images.forEach((image) => {
        formData.append("file", image);
      });
    }  
    formData.append('userId', userId)  
    try {
      let res = '';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      if(productId){
        res = await axios.put(`/products/edit-product/${productId}` , formData, config);
      }else{
        res = await axios.post('/products/add-product', formData, config);
      }   
      console.log(res) 
      if (res.data.status == 'success') {
        toast.success("SuccessFull ")
        navigate('/rented-item');
      }
    } catch (err) {
      console.log(err)
      toast.error('Error Occured Try again')
    }
    }else{
      toast.error('Something Is Not Correct')
    }
    
};

  const onChange = (e) => {
    const {name, value, type, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    firstValidateForm();
    secondValidateForm
  };

  const setDoc=(value)=>{
    setValues({...values,documents:value})
    firstValidateForm();
  }

  const handleFile = (e) => {
    setImage(e)
    thirdValidateForm()
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
            {productId?"Edit":"Submit"}
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
      <Toaster />
      </div>
  );
};

export default ParentComponent;
