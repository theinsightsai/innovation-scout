"use client";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API } from "@/app/axios/apiConstant";
import dynamic from "next/dynamic";

const FilledButton = dynamic(() => import("@/components/Button/FilledButton"), {
  ssr: false,
});
const FormController = dynamic(() => import("@/components/FormController"), {
  ssr: false,
});

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const initialValues = { email: "", password: "", isChecked: false };

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const onSubmit = (values) => {
    if (values?.isChecked) {
      postApi(API.REGISTER, {
        email: values?.email,
        password: values?.password,
      }).then((data) => {
        ToastMessage("success", data?.message);
      });
    } else {
      ToastMessage("error", ERROR_TEXT.TERMS_CONDITIONS);
    }
  };

  const REGISTER_FORM = [
    { id: "email", label: "Email Address", component: "TEXT" },
    { id: "password", label: "Password", component: "PASSWORD" },
    {
      id: "isChecked",
      label: <div className="font-outfit w-full">Remember Me</div>,
      component: "LABEL_CHECK",
    },
  ];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  const { setFieldValue, values, handleSubmit, touched, errors } = formik;

  return (
    <div>

      <h1
        style={{
          fontSize: "24px",
          marginBlockStart: "20px",
          marginBottom: "10px",
          fontFamily: "Outfit, sans-serif",
          textAlign: "center",

        }}
      >
        Login
      </h1>
      <StyledForm noValidate onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
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
            label={"Login"}
            onClick={handleSubmit}
            style={{ width: "35%", marginTop: "30px" }}
          />
        </div>
      </StyledForm>
    </div>
  );
};
export default LoginForm;
