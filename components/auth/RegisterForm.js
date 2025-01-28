"use client";
import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled, width } from "@mui/system";
import { WithAuthLayout } from "../hoc";
import { FilledButton } from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ErrorSection = ({ touched, errors, fieldName }) => {
  return (
    <div className="italic">
      {touched?.[fieldName] ? (
        errors?.[fieldName]
      ) : (
        <div className="invisible">helping text</div>
      )}
    </div>
  );
};

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDown = (event) => event.preventDefault();

  const onsubmit = (values) => {
    console.log("values==>", values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: onsubmit,
    enableReinitialize: true,
  });

  const { setFieldValue, values, handleSubmit, touched, errors } = formik;

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ marginBlockStart: "20px " }}
      >
        Register
      </Typography>
      <StyledForm noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          onChange={(event) => setFieldValue("name", event.target.value)}
          autoFocus
          value={values.name}
          error={touched.name && Boolean(errors.name)}
          helperText={
            <ErrorSection fieldName="name" touched={touched} errors={errors} />
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={(event) => setFieldValue("email", event.target.value)}
          value={values.email}
          error={touched.email && Boolean(errors.email)}
          helperText={
            <ErrorSection fieldName="email" touched={touched} errors={errors} />
          }
          sx={{ marginTop: "0px" }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="password"
          onChange={(event) => setFieldValue("password", event.target.value)}
          value={values.password}
          error={touched.password && Boolean(errors.password)}
          helperText={
            <ErrorSection
              fieldName="password"
              touched={touched}
              errors={errors}
            />
          }
          sx={{ marginTop: "0px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDown}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          autoComplete="confirmPassword"
          onChange={(event) =>
            setFieldValue("confirmPassword", event.target.value)
          }
          value={values.confirmPassword}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={
            <ErrorSection
              fieldName="confirmPassword"
              touched={touched}
              errors={errors}
            />
          }
          sx={{ marginTop: "0px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDown}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          sx={{ marginTop: "5px" }}
          control={<Checkbox value="remember" color="primary" />}
          label={
            <div className="font-outfit w-full">
              I agree to the
              <span
                href="/terms"
                target="_blank"
                className="text-[#005B96] mx-1"
              >
                Terms and Conditions
              </span>
              <span className="mx-1">and</span>
              <span href="/privacy" target="_blank" className="text-[#005B96]">
                Privacy Policy
              </span>
            </div>
          }
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <FilledButton
            label={"Register"}
            onClick={handleSubmit}
            style={{ width: "35%", marginTop: "30px" }}
          />
        </div>
      </StyledForm>
    </>
  );
};

export default WithAuthLayout(RegisterForm);
