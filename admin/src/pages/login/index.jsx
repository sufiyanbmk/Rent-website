/* eslint-disable */
import {Box, Typography, TextField, Button, Grid, Stack,} from '@mui/material';
import React, { useState } from 'react';
import axios from '../../axios/axios.js'
import { useNavigate } from "react-router-dom";
import { login } from '../../features/userSlice'
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const admin = {
      email: email,
      password: password,
      accessToken: 'hjjhj454454'
    }

    axios.post('/login' ,{admin}).then((res)=>{
        dispatch(login(admin))
        navigate('/dashboard')
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.massage)
    })
    // Axios.post('/login', { admin }, {
    //   headers: { "Content-Type": "application/json" },
    //   withCredentials: true,
    // }).then((response) => {
    //  
    //   if(response.status === 401){
    //     console.log('ifff')
    //     throw new Error
    //   }
    // }).catch((err) => {
    //   console.log(err)
    //   setError('incorrect username or password')
    // })
  }
  // function redirect(e) {
  //   e.preventDefault()
  //   const admin={
  //     email: email,
  //     password: password,
  //     accessToken:'hjjhj454454'
  //   }
  //   Axios.post('/adminlogin', { admin }, {
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   }).then((response) => {
  //     dispatch(adminlogin(admin)) 
  //     navigate('/adminhome')
  //   }).catch(() => {
  //     setError('incorrect username or password')
  //   })
  // }

  return (
    <Grid
      minHeight="100vh"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        direction: 'column',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        bgcolor="red"
        p={5}
        className="centerDiv"
      >
        <Box textAlign="center">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Typography variant="h5" color="initial">
              Admin Login
            {error?<p style={{color:"red"}}>{error}</p>:null}
            </Typography>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              paddingTop={2}
            >
              <TextField
                variant="outlined"
                label="Username"
                fullWidth
                style={{ marginBlock: '1rem' }}
                name="email"
                id='email'
                onChange={(e) => setEmail(e.target.value)}

              />
              <TextField
                variant="outlined"
                label="Password"
                fullWidth
                type="password"
                style={{ marginBlock: '1rem' }}
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' size="large" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </form>
        </Box>
      </Stack>
    </Grid>
  );
}

export default Login;
