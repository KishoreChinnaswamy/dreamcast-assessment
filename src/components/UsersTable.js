import React, { useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import DeleteUserModal from "./DeleteUserModal";
import { fetchUsers, userActions } from "../store/UserSlice";
import AddUserModal from "./AddUserModal";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { users, openDeleteUserModal, selectedUser, openAddUserModal } =
    useSelector((state) => state.user);

  const handleDeleteUserModal = (user) => {
    dispatch(userActions.toggleDeleteUserModal());
    dispatch(userActions.setSelectedUser(user));
  };

  const handleEditUserModal = (user) => {
    dispatch(userActions.openAddUserModal());
    dispatch(userActions.setIsEditingUser(true));
    dispatch(userActions.setSelectedUser(user));
  };

  const handleAddUserModal = () => {
    dispatch(userActions.closeAddUserModal());
    dispatch(userActions.setIsEditingUser(false));
    dispatch(userActions.setSelectedUser(null));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      {openDeleteUserModal && (
        <DeleteUserModal
          open={openDeleteUserModal}
          handleClose={handleDeleteUserModal}
          currentUser={selectedUser}
        />
      )}
      {openAddUserModal && (
        <AddUserModal
          open={openAddUserModal}
          handleClose={handleAddUserModal}
        />
      )}
      <Table className="users-table" aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell className="table-header">ID</TableCell>
            <TableCell className="table-header">Name</TableCell>
            <TableCell className="table-header">Email</TableCell>
            <TableCell className="table-header">Phone</TableCell>
            <TableCell className="table-header">City</TableCell>
            <TableCell className="table-header">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                height: "20px",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                <Typography>{user.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{user.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{user.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{user.phone}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {user.address.city} - {user.address.zipcode}
                </Typography>
              </TableCell>
              <TableCell className="action-column">
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditUserModal(user)}>
                    <EditIcon sx={{ color: "#1a237e" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteUserModal(user)}>
                    <DeleteIcon sx={{ color: "#ef5350" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
