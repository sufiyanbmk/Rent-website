/* eslint-disable */
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Headers";
import { makeStyles } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

const useStyles = makeStyles({
  muiVersion: {
    background: 'linear-gradient(to bottom right, #ccc, #eee)',
    marginTop: '4em',
    textAlign: 'center',
    padding: '1em',
    borderRadius: '4px',
  },
  btn: {
    background: '#333',
    color: 'white',
    fontSize: '2.4rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    padding: '1em 2.4em',
    boxShadow: '0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.466)',
    '&:hover': {
      background: '#111',
      transform: 'translateY(-0.25rem)',
      boxShadow: '0.45rem 0.45rem 0.45rem rgba(153, 153, 153, 0.651)',
    },
  },
  imageSection: {
    height: '20em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: '25vw',
    height: '25vw',
    minWidth: '10em',
    minHeight: '10em',
    maxWidth: '20em',
    maxHeight: '20em',
    objectFit: 'contain',
  },
  nopic: { color: 'black' },
  link: { color: 'black' },
});
const AddProduct = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="ADD-PRODUCT" subtitle="Create a New User Product" />

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
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="product"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Catagory"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="catagory"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Documents"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="documents"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="description"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* image uploader */}
            <div className={classes.muiVersion}>
              <div className={classes.imageSection}>
                {imageId ? (
                  <>
                    <img
                      className={classes.img}
                      src={`/api/image/${imageId}`}
                      alt='material ui version preview'
                    />
                    <a
                      className={classes.link}
                      href={`/api/image/${imageId}`}
                      target='_blank'
                    >
                      link
                    </a>
                  </>
                ) : (
                  <p className={classes.nopic}>no mui version pic yet</p>
                )}
              </div>
              <Button className={classes.btn} onClick={() => setShow(true)}>
                mui version
              </Button>
              <DropzoneDialog
                open={show}
                onChange={handleFile}
                onClose={() => setShow(false)}
                onDelete={handleDelete}
                acceptedFiles={['image/jpeg', 'image/png']}
                maxFileSize={5000000}
                filesLimit={1}
                showFileNamesInPreview={false}
                showFileNames={false}
                dropzoneText={'Drop it here'}
                getFileAddedMessage={() => 'file added!'}
                getFileRemovedMessage={() => 'file removed!'}
                onAlert={(alert) => console.log({ alert })}
                getFileLimitExceedMessage={() => 'file is too big'}
                getDropRejectMessage={(file) => {
                  if (file.size > 5000000) return 'file is too big';
                  else return 'invalid file type';
                }}
                onSave={handleSubmit}
              />
            </div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
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
  product: yup.string().required("required"),
  Catagory: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  documents: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  product: "",
  catagory: "",
  email: "",
  contact: "",
  address: "",
  documents: "",
  description: "",
};

export default AddProduct;
