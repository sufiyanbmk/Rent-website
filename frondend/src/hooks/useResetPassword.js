/* eslint-disable */
import React, { useState } from "react";

function resetPassword() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = {};
          setErrors(newObj);
        }
        break;
      case "confirm":
        console.log(values.password);
        console.log(values.confirm === values.password);
        if (values.password !== values.confirm) {
          console.log("confirm");
          setErrors({
            ...errors,
            confirm: "Password not matching",
          });
        } else {
          let newObj = {};
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };
  const handleChange = (event) => {
    //To stop default events
    event.preventDefault();

    let name = event.target.name;
    let val = event.target.value;
    validate(event, name, val);
    //Let's set these values in state

    setValues({
      ...values,
      [name]: val,
    });
  };
  return {
    values,
    errors,
    handleChange,
  };
}

export default resetPassword;
