/* eslint-disable */
import {
  IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


function ReportShowing({singleProReport}) {
  const [post, setPosts] = useState([]);
  const navigate = useNavigate();
  const [deletepost, setDeletepost] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="left">User Name</TableCell>
            <TableCell align="left">Reports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleProReport?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.report}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportShowing;