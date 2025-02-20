"use client";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ERROR_TEXT } from "@/constants";
import { API } from "@/app/api/apiConstant";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ToastMessage from "@/components/ToastMessage";
import { Tick } from "@/constants/assets";
import { UserIconSvg, EmailIconSvg, PasswordSvg } from "@/constants/assets";

const FormController = dynamic(() => import("@/components/FormController"), {
  ssr: false,
});

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
  const [postApi, setPostApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successPage, setSuccessPage] = useState(false);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi } = await import("@/app/api/clientApi");
      setPostApi(() => postApi);
      setLoading(false);
    };

    loadApi();
  }, []);

  const onsubmit = async (values, { setSubmitting }) => {
    try {
      if (!values?.isChecked) {
        ToastMessage("error", ERROR_TEXT.TERMS_CONDITIONS);
        return;
      }
      setSubmitting(true);

      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }

      const response = await postApi(API.REGISTER, {
        name: values?.name,
        email: values?.email,
        password: values?.password,
        role_id: "3",
      });

      if (response?.error) {
        ToastMessage("error", response?.message);
      } else if (!response?.error) {
        setSuccessPage(true);
        ToastMessage("success", response?.data?.message);
      }
    } catch (error) {
      ToastMessage("error", ERROR_TEXT.SOMETHING_WENT_WRONG);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onsubmit,
    enableReinitialize: true,
  });

  const { setFieldValue, values, handleSubmit, touched, errors, isSubmitting } =
    formik;

  const REGISTER_FORM = [
    { id: "name", label: "Name", component: "TEXT", icon: <UserIconSvg /> },
    {
      id: "email",
      label: "Email Address",
      component: "TEXT",
      icon: <EmailIconSvg />,
    },
    {
      id: "password",
      label: "Password",
      component: "PASSWORD",
      icon: <PasswordSvg />,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      component: "PASSWORD",
      icon: <PasswordSvg />,
    },
    {
      id: "isChecked",
      label: (
        <div className="font-outfit w-full">
          I agree to the
          <span href="/terms" target="_blank" className="text-[#1A22B5] mx-1">
            Terms and Conditions
          </span>
          <span className="mx-1">and</span>
          <span href="/privacy" target="_blank" className="text-[#1A22B5]">
            Privacy Policy
          </span>
        </div>
      ),
      component: "LABEL_CHECK",
    },
  ];

  return (
    <>
      {successPage ? (
        <div className="w-full flex flex-col items-center">
          <div className="my-5">
            <Tick />
          </div>
          <div>Registration Completed Successfully</div>
        </div>
      ) : (
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full mt-9 "
        >
          {REGISTER_FORM.map((fieldObj, i, arr) => {
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
          <button
            className={`w-[180px] py-4 px-10 rounded-full text-white transition-colors duration-500 bg-[#1A22B5] mt-10`}
            disabled={isSubmitting || loading}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </StyledForm>
      )}
    </>
  );
};

export default RegisterForm;
