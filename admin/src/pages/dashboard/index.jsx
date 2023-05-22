/* eslint-disable */
import { Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { FaUsersSlash } from 'react-icons/fa';
import { MdVerified, MdOutlinePostAdd } from 'react-icons/md';
import axios from '../../axios/axios';
import useFetch from '../../hooks/useFetch';
import Charts from './charts';

function Dashboard() {
  // const [data, setData] = useState({});
  const {result,loading,error} = useFetch('/get-dashboard-data')
  console.log(result,'data')
  return (
    <>
      <Grid container spacing={10} columns={16} alignItems="center" justifyContent="center" p={2}>
        <Grid item xs={8} md={3}>
          <Paper
            elevation={10}
            sx={{
              display: 'flex',
              width: '15rem',
              height: '10rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <FiUsers size={40} />
            </div>
            <div style={{ textAlign: 'center', padding: '10%' }}>
              <Typography variant="h6" color="red">Total Users</Typography>
              <Typography variant="h6" color="red">{result?.usercount}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8} md={3}>
          <Paper
            elevation={10}
            sx={{
              display: 'flex',
              width: '15rem',
              height: '10rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <FaUsersSlash size={40} />
            </div>
            <div style={{ textAlign: 'center', padding: '10%' }}>
              <Typography variant="h6" color="red">Blocked Users</Typography>
              <Typography variant="h6" color="red">{result?.blockedCount}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8} md={3}>
          <Paper
            elevation={10}
            sx={{
              display: 'flex',
              width: '15rem',
              height: '10rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <MdVerified size={40} />
            </div>
            <div style={{ textAlign: 'center', padding: '10%' }}>
              <Typography variant="h6" color="red">Verified Users</Typography>
              <Typography variant="h6" color="red">{result?.verifiedCount}</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center" p={2}>
        <Charts />
      </Grid>
    </>
  );
}

export default Dashboard;
