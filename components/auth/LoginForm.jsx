"use client";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ERROR_TEXT, ROUTE } from "@/constants";
import { API } from "@/app/api/apiConstant";
import ToastMessage from "@/components/ToastMessage/";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state) => state);

  const [postApi, setPostApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi } = await import("@/app/api/clientApi");
      setPostApi(() => postApi);
      setLoading(false);
    };

    loadApi();
  }, []);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }
      dispatch(loginStart());
      setSubmitting(true);

      const response = await postApi(API.LOGIN, {
        email: values?.email,
        password: values?.password,
      });

      if (response?.error) {
        dispatch(loginFailure(response?.message));
        ToastMessage("error", response?.message);
      } else if (!response?.error) {
        dispatch(
          loginSuccess({
            user: {
              ...response?.data?.data,
            },
            token: response?.data?.data?.token,
            role_id: response?.data?.data?.role?.id,
          })
        );
        ToastMessage("success", response?.data?.message);
        router.push(ROUTE.DASHBOARD);
      }
    } catch (error) {
      dispatch(loginFailure(ERROR_TEXT.SOMETHING_WENT_WRONG));
      ToastMessage("error", ERROR_TEXT.SOMETHING_WENT_WRONG);
    } finally {
      setSubmitting(false);
    }
  };

  const LOGIN_FORM = [
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
      <StyledForm noValidate onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
        {LOGIN_FORM.map((fieldObj) => {
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

        <div className="flex justify-center w-full mt-8">
          <FilledButton
            type="submit"
            label={loading ? "Loading..." : "Login"}
            disabled={loading}
            style={{ width: "35%" }}
          />
        </div>
      </StyledForm>
    </div>
  );
};

export default LoginForm;
