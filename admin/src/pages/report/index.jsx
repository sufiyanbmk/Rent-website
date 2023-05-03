/* eslint-disable */
import {
  IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import axios from '../../axios/axios';
import useFetch from 'hooks/useFetch';
import ReportShowing from './reportShowing';
import { delteProduct } from '../../api/api';
import DeleteModal from '../../component/ConfirmModal';
import toast, { Toaster } from 'react-hot-toast';

function ReportPost() {
  const [singleReport, setSingleReport] = useState();
  const [isReportShowing, setIsReportShowing] = useState(false);
  const navigate = useNavigate();
  const [deletepost, setDeletepost] = useState(false);
  const { result, error, loading } = useFetch('/reported-product')
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (productId) => {
    setShowDeleteModal(true);
  };
  const handleDeleteModalConfirm = (productId) => {
    setShowDeleteModal(false)
    toast.promise(delteProduct(productId), {
      loading: 'Deleting...',
      success: <b>Successfully removed product!</b>,
      successDuration: 7000,
      error: <b>Could not remove product.</b>,
    });
    setDeletepost(!deletepost)
  }

  const handleNavigate = (report) => {
    setIsReportShowing(true)
    setSingleReport(report)
  };
  return (
    <>
      {isReportShowing ? (
        <ReportShowing singleProReport={singleReport} />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Reports count</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result?.map((row, i) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{row.productName}</TableCell>
                  <TableCell align="left">{row.reports.length}</TableCell>
                  <TableCell align="left">
                    <Tooltip title="Delete" sx={{ padding: '5px' }} onClick={() => handleDelete(row._id)}>
                      <IconButton>
                        <MdDelete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Post" sx={{ padding: '5px', marginX: '2px' }} onClick={() => handleNavigate(row.reports)}>
                      <IconButton>
                        <MdArrowForwardIos />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {showDeleteModal && (
                    <DeleteModal
                      onConfirm={() => handleDeleteModalConfirm(row._id)}
                      type='delete'
                    />
                  )}
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
        <Toaster />

    </>
  );
}

export default ReportPost;