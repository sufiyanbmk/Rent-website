/* eslint-disable */
import React, { useState } from 'react';

function useSignupForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
        case 'userName':
            if(value.length <= 4){
                // we will set the error state

                setErrors({
                    ...errors,
                    username:'Username atleast have 5 letters'
                })
            }else{
                // set the error state empty or remove the error for username input

                //omit function removes/omits the value from given object and returns a new object
                let newObj = {};
                setErrors(newObj);
                
            }
            break;
    
        case 'email':
            if(
                !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
            ){
                setErrors({
                    ...errors,
                    email:'Enter a valid email address'
                })
            }else{

                let newObj = {};
                setErrors(newObj);
                
            }
        break;

        case 'phone':
          if(!new RegExp(/^[0-9\-\+]{10,10}$/).test(value)){
            setErrors({
              ...errors,
              phone:'Enter a valid Phone Number'
          })
          }else{
            let newObj = {};
                setErrors(newObj);
          }
        break;

        case 'password':
            if(
                !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
            ){
                setErrors({
                    ...errors,
                    password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                })
            }else{

                let newObj = {};
                setErrors(newObj);
                
            }
        break;
        case 'confirm':
          console.log(values.password)
          console.log(values.confirm===values.password)
          if(values.password !== values.confirm){
            console.log('confirm')
            setErrors({
              ...errors,
              confirm:'Password not matching'
            })
          }else{
            let newObj = {};
            setErrors(newObj);
          }
          break;
        
        default:
            break;
    }
}

const handleChange = (event) => {
  //To stop default events    
  event.preventDefault();

  let name = event.target.name;
  let val = event.target.value;
  validate(event,name,val);
  //Let's set these values in state

  setValues({
      ...values,
      [name]:val,
  })

}
  return {
    values,
    errors,
    handleChange
  }
}

export default useSignupForm

