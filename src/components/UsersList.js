import React from "react";
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

import UsersTable from "./UsersTable";
import AddUserModal from "./AddUserModal";
import { userActions } from "../store/UserSlice";

export default function UsersList() {
  const dispatch = useDispatch();

  const {
    showNotification,
    notificationMessage,
    notificationSeverity,
    openAddUserModal,
  } = useSelector((state) => state.user);

  const handleAddUserModal = () => {
    dispatch(userActions.openAddUserModal());
  };

  const closeNotificationHandler = () => {
    dispatch(userActions.closeNotification());
  };

  return (
    <Grid container xs={12} spacing={2} padding={6}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showNotification}
        autoHideDuration={3000}
        onClose={closeNotificationHandler}
      >
        <Alert
          onClose={closeNotificationHandler}
          severity={notificationSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>

      {openAddUserModal && (
        <AddUserModal
          open={openAddUserModal}
          handleClose={handleAddUserModal}
        />
      )}

      <Grid item xs={12} md={8}>
        <Typography className="title">Users List</Typography>
      </Grid>
      <Grid item xs={12} md={4} textAlign="end">
        <Button
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUserModal}
        >
          Create User
        </Button>
      </Grid>
      <Grid item xs={12}>
        <UsersTable />
      </Grid>
    </Grid>
  );
}
