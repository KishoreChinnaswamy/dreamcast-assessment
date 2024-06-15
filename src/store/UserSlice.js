import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    openAddUserModal: false,
    isEditingUser: false,
    openDeleteUserModal: false,
    selectedUser: null,
    loading: false,
    error: false,
    showNotification: false,
    notificationMessage: "",
    notificationSeverity: "success",
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.users = [...state.users, newUser];
      state.showNotification = true;
      state.notificationMessage = "User Added Successfully!";
      state.notificationSeverity = "success";
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      const updatedUserIndex = state.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (updatedUserIndex >= 0) {
        state.users[updatedUserIndex] = updatedUser;
      }
      state.showNotification = true;
      state.notificationMessage = "User Updated Successfully!";
      state.notificationSeverity = "success";
    },
    deleteUser(state, action) {
      const userIdToDelete = action.payload;
      state.users = state.users.filter((user) => user.id !== userIdToDelete);
      state.showNotification = true;
      state.notificationMessage = "User Deleted Successfully!";
      state.notificationSeverity = "success";
    },

    closeNotification(state) {
      state.showNotification = false;
      state.notificationMessage = "";
      state.notificationSeverity = "";
    },

    toggleDeleteUserModal(state) {
      state.openDeleteUserModal = !state.openDeleteUserModal;
    },

    openAddUserModal(state) {
      state.openAddUserModal = true;
    },

    closeAddUserModal(state) {
      state.openAddUserModal = false;
    },

    setIsEditingUser(state, action) {
      state.isEditingUser = action.payload;
    },

    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
