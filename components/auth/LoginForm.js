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
import { styled } from "@mui/system";
import { WithAuthLayout } from "../hoc";
import { FilledButton } from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values) => {
    toast.success("Login successfuly");
    router.push(ROUTE.DASHBOARD);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmit,
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
        Login
      </Typography>
      <StyledForm noValidate onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
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
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          sx={{ marginTop: "5px" }}
          control={<Checkbox value="remember" color="primary" />}
          label={<div className="font-outfit w-full">Remember Me</div>}
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <FilledButton
            label={"Login"}
            onClick={handleSubmit}
            style={{ width: "35%", marginTop: "30px" }}
          />
        </div>
      </StyledForm>
    </>
  );
};
export default WithAuthLayout(LoginForm);
