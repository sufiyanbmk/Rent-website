/* eslint-disable */
import { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import Header from "../../component/Headers";
import useFetch from "hooks/useFetch";
import { AiFillDelete } from 'react-icons/ai';
import DeleteModal from '../../component/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';

const Catagory = () => {
  const { result, error, loading } = useFetch('/catagory')
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDelete = (id) => {
    setShowDeleteModal(true);
    // Make a delete request to the server with the user ID
    // Refresh the data in the table
  }
  const rows = result;
  const rowsWithNo = rows.map((row, index) => ({ ...row, no: index + 1 }));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "no", headerName: "NO" },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "blocked",
      headerName: "ACTION",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row._id)}>
            <AiFillDelete />
          </Button>
        )
      }
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
        <DataGrid getRowId={(row) => row._id} rows={rowsWithNo} columns={columns} />
      </Box>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={() => handleDeleteModalConfirm(rows._id)}
          type='delete'
        />
      )}
    </Box>
  );
};

export default Catagory;
