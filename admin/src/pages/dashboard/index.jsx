/* eslint-disable */
import { Grid, Paper, Typography } from '@mui/material';
import { FiUsers } from 'react-icons/fi';
import { FaUsersSlash } from 'react-icons/fa';
import { MdVerified, MdOutlinePostAdd } from 'react-icons/md';
import useFetch from '../../hooks/useFetch';
import Charts from './charts';
import Card from 'component/card';

function Dashboard() {
  const {result,loading,error} = useFetch('/admin/dashboard-data')
  return (
    <>
    <Grid
      container
      spacing={10}
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
        },
      }}
    >
        <Card icon={<FiUsers size={40}/>} title={"Total user"} value={result?.userCount}/>
        <Card icon={<FaUsersSlash size={40} />} title={"Blocked User"} value={result?.blockedCount} /> 
        <Card icon={<MdVerified size={40}  />} title={"Verified Users"} value={result?.verifiedCount} /> 
        <Card icon={<MdOutlinePostAdd size={40}  />} title={"Total Products"} value={result?.postCount} /> 
      </Grid>
      <Grid
      container
      spacing={4}
      columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
      alignItems="center"
      justifyContent="center"
      p={2}
      sx={{
        "@media (max-width: 600px)": {
          columns: 4,
        },
        "@media (min-width: 601px) and (max-width: 960px)": {
          columns: 8,
        },
        "@media (min-width: 961px) and (max-width: 1280px)": {
          columns: 12,
        },
        "@media (min-width: 1281px)": {
          columns: 16,
        },
      }}
    >
      <Charts />
    </Grid>
    </>
  );
}

export default Dashboard;
