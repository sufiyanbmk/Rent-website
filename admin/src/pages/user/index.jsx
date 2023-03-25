/* eslint-disable */
import { Box, Typography, useTheme, Button, Switch} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../component/Headers";
import useFetch from "hooks/useFetch";
import axios from "../../axios/axios";

const User = () => {
  const { data } = useFetch(
    'http://localhost:8000/admin/users'
  )
  const blockUser = (email,block) => {
    axios.put('/block-user', { email,block }).then(() => {

    }).catch((err) => {
      console.log(err);
    });
  };
  
  const rows = data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "row._id", headerName: "NO" },
    {
      field: "username",
      headerName: "user Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "blocked",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params) => {
        return (
          <Switch checked={params.row.blocked}onChange={() => blockUser(params.row.email,params.row.blocked)} />
        )}
    },
  ];

  

  return (
    <Box m="20px">
      <Header title="Catagory" subtitle="Catagory For The Product" />
      <Button variant="contained" color="success"><Link to="/addCatagory">ADD Catagory</Link></Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid getRowId={(row) => row._id} checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default User;