import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckIcon from "@mui/icons-material/Check";

import { userActions } from "../store/UserSlice";

export default function AddUserModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { users, isEditingUser, selectedUser } = useSelector(
    (state) => state.user
  );

  const userSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required."),
    address: Yup.object()
      .shape({
        street: Yup.string().required("Street is required."),
        suite: Yup.string().required("Suite is required."),
        city: Yup.string().required("City is requied."),
        zipcode: Yup.string().required("Zipcode is required."),
        geo: Yup.object().shape({
          lat: Yup.string().required("Latitude is required"),
          lng: Yup.string().required("Longitude is required"),
        }),
      })
      .required("Address is required."),
    company: Yup.object().shape({
      name: Yup.string(),
      catchPhrase: Yup.string(),
      bs: Yup.string(),
    }),
  });

  const initilData = {
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchphrase: "",
      bs: "",
    },
  };

  const formik = useFormik({
    initialValues: isEditingUser
      ? { ...selectedUser }
      : {
          ...initilData,
        },
    validationSchema: userSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!isEditingUser) {
        values.id = users?.length + 1;
        dispatch(userActions.addUser(values));
      } else {
        dispatch(userActions.updateUser(values));
      }
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Typography className="title">
          {isEditingUser ? "Edit" : "Add"} User
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} padding={1}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <Typography className="error">{formik.errors.name}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <Typography className="error">
                {formik.errors.username}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <Typography className="error">{formik.errors.email}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && (
              <Typography className="error">{formik.errors.phone}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="Website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Street"
              name="address.street"
              value={formik.values.address.street}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.street && (
              <Typography className="error">
                {formik.errors.address.street}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Suite"
              name="address.suite"
              value={formik.values.address.suite}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.suite && (
              <Typography className="error">
                {formik.errors.address.suite}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="City"
              name="address.city"
              value={formik.values.address.city}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.city && (
              <Typography className="error">
                {formik.errors.address.city}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Zipcode"
              name="address.zipcode"
              value={formik.values.address.zipcode}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.zipcode && (
              <Typography className="error">
                {formik.errors.address.zipcode}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography>Geo</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Lat"
              name="address.geo.lat"
              value={formik.values.address.geo.lat}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.geo.lat && (
              <Typography className="error">
                {formik.errors.address.geo.lat}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              size="small"
              label="Lng"
              name="address.geo.lng"
              value={formik.values.address.geo.lng}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.errors.address.geo.lng && (
              <Typography className="error">
                {formik.errors.address.geo.lng}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography>Company</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="Name"
              value={formik.values.company.name}
              name="company.name"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="Catch Phrase"
              value={formik.values.company.catchPhrase}
              name="company.catchPhrase"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="BS"
              value={formik.values.company.bs}
              name="company.bs"
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
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
          onClick={formik.handleSubmit}
          size="small"
          variant="contained"
          startIcon={isEditingUser ? <CheckIcon /> : <AddIcon />}
        >
          {isEditingUser ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
