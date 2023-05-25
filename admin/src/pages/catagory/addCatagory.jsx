/* eslint-disable */
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Headers";
import { useNavigate } from "react-router-dom";
import { addCatagory } from "api/api";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const handleFormSubmit = async(values) => {
    console.log(values);
    try {
      const res = await addCatagory(values)
      if (!res.ok){         
        alert(result.message)
        navigate('/addCatagory')
        return
      } 
      console.log(result.data)
      navigate('/catagory')
    } catch (err) {
      console.log(err)
      // dispatch({ type: 'LOGIN_FAILED', payload: err.message })
    }
  };

  return (
    <Box m="20px">
      <Header title="ADD CATAGORY" subtitle="Create a New Catagory" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Catagory Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Discription"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discription}
                name="discription"
                error={!!touched.discription && !!errors.discription}
                helperText={touched.discription && errors.discription}
                sx={{ gridColumn: "span 2" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Catagory
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  discription: yup.string().required("required"),
});
const initialValues = {
  title: "",
  discription: "",
};

export default Form;