/* eslint-disable */
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { AiFillDelete } from 'react-icons/ai'

export default function Modal({ onConfirm, type }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onConfirm(false)
  };

  const handleDelete = () => {
    onConfirm(true);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {type === "delete" ? "Delete" : "Logout"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AiFillDelete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}