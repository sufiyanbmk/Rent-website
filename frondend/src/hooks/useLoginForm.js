/* eslint-disable */
import React, {useState} from 'react';

const useLoginForm=()=> {
  const [values, setValues ] = useState({});
  const [errors, setErrors ] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {    
        case 'email':
            if(
                !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
            ){
                setErrors({
                    ...errors,
                    email:'Enter a valid email address'
                })
            }else{

                let newObj = {}
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
        
        default:
            break;
    }
}

 
  const handleChange=(e)=> {
    e.preventDefault();
    let name = e.target.name;
    let val = e.target.value;
    validate(e,name,val);
    setValues({
      ...values,
      [name] : val,
    })
  }
  return {
   values,
   errors,
   handleChange
}
}

export default useLoginForm
