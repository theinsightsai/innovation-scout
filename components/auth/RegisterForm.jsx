"use client";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ERROR_TEXT, ROUTE } from "@/constants";
import { API } from "@/app/api/apiConstant";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ToastMessage from "@/components/ToastMessage";
import { Tick } from "@/constants/assets";
import { useRouter } from "next/navigation";

// Dynamically import the postApi
const FilledButton = dynamic(() => import("@/components/Button/FilledButton"), {
  ssr: false,
});
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
  const router = useRouter();
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
        username: values?.name,
        email: values?.email,
        password: values?.password,
        role_id: "3 ",
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
      <h1 class="text-xl mt-5 mb-2 font-outfit">
        {successPage ? "Registered" : "Register"}
      </h1>
      {successPage ? (
        <div className="w-full flex flex-col items-center">
          <div className="my-5">
            <Tick />
          </div>
          <div>Registration Completed Successfully</div>
          <FilledButton
            type="button"
            label={"Login"}
            style={{ width: "35%", marginTop: "30px" }}
            onClick={() => router.push(ROUTE.LOGIN)}
          />
        </div>
      ) : (
        <StyledForm noValidate onSubmit={handleSubmit}>
          {REGISTER_FORM.map((fieldObj) => (
            <FormController
              key={fieldObj?.id}
              fieldObj={fieldObj}
              values={values}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          ))}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <FilledButton
              type="submit"
              label={isSubmitting ? "Submitting..." : "Register"}
              style={{ width: "35%", marginTop: "30px" }}
              disabled={isSubmitting || loading}
            />
          </div>
        </StyledForm>
      )}
    </>
  );
};

export default RegisterForm;
