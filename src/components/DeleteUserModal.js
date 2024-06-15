import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { userActions } from "../store/UserSlice";

export default function DeleteUserModal({ open, handleClose, currentUser }) {
  console.log("currentUser", currentUser);
  const dispatch = useDispatch();

  const deleteUser = () => {
    dispatch(userActions.deleteUser(currentUser.id));
    dispatch(userActions.setSelectedUser(null));
    handleClose();
  };

  const closeModalHandler = () => {
    dispatch(userActions.setSelectedUser(null));
    handleClose();
  };

  return (
    <Dialog onClose={closeModalHandler} open={open} fullWidth>
      <DialogTitle>
        <Typography className="title">Delete User</Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete the user?</Typography>
        <Typography>(This action cannot be undone.)</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          className="secondary-button"
          startIcon={<CloseIcon />}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          onClick={deleteUser}
          size="small"
          variant="contained"
          className="delete-button"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
