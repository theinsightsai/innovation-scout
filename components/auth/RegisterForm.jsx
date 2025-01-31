"use client";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
// import { WithAuthLayout } from ".."
import { FilledButton } from ".."
import { useFormik } from "formik";
import * as Yup from "yup";
import { postApi } from "@/app/axios/clientApi";
import { ERROR_TEXT } from "@/constants";
import { API } from "@/app/axios/apiConstant";
import ToastMessage from "../ToastMessage";
import FormController from "../FormController";

const initialValues = {
  isChecked: false,
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
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
  const onsubmit = (values) => {
    if (values?.isChecked) {
      postApi(API.REGISTER, {
        username: values?.name,
        email: values?.email,
        password: values?.password,
      }).then((data) => {
        ToastMessage("success", data?.message);
      });
    } else {
      ToastMessage("error", ERROR_TEXT.TERMS_CONDITIONS);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onsubmit,
    enableReinitialize: true,
  });

  const { setFieldValue, values, handleSubmit, touched, errors } = formik;

  const REGISTER_FORM = [
    { id: "name", label: "Name", component: "TEXT" },
    { id: "email", label: "Email Address", component: "TEXT" },
    { id: "password", label: "Password", component: "PASSWORD" },
    { id: "confirmPassword", label: "Confirm Password", component: "PASSWORD" },
    {
      id: "isChecked",
      label: (
        <div className="font-outfit w-full">
          I agree to the
          <span href="/terms" target="_blank" className="text-[#005B96] mx-1">
            Terms and Conditions
          </span>
          <span className="mx-1">and</span>
          <span href="/privacy" target="_blank" className="text-[#005B96]">
            Privacy Policy
          </span>
        </div>
      ),
      component: "LABEL_CHECK",
    },
  ];

  return (
    <>
      <h1
        style={{
          fontSize: "24px",
          marginBlockStart: "20px",
          marginBottom: "10px",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        Register
      </h1>
      <StyledForm noValidate onSubmit={handleSubmit}>
        {REGISTER_FORM.map((fieldObj, index, arr) => {
          return (
            <FormController
              key={fieldObj?.id}
              fieldObj={fieldObj}
              values={values}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          );
        })}
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

export default RegisterForm;
// WithAuthLayout
