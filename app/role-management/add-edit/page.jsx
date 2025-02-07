"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Fragment } from "react";
import withLayout from "@/components/hoc/withLayout";
import { PageHeader } from "@/components";
import { Paper } from "@mui/material";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { ERROR_TEXT, ROUTE } from "@/constants";
import { API } from "@/app/api/apiConstant";
import ToastMessage from "@/components/ToastMessage";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FormController = dynamic(() => import("@/components/FormController"), {
  ssr: false,
});

const initialValues = {
  role_name: "",
  role_status: "",
  details: "",
};

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const validationSchema = Yup.object({
  role_name: Yup.string().required("Role Name is required"),
  role_status: Yup.string().required("Status is required"),
  details: Yup.string(),
});

const AddRole = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");
  const isEditMode = Boolean(roleId); // Converts roleId to a boolean

  const [postApi, setPostApi] = useState(null);
  const [getApi, setGetApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi, getApi } = await import("@/app/api/clientApi");
      setPostApi(() => postApi);
      setGetApi(() => getApi);
      setLoading(false);
    };

    loadApi();
  }, []);

  // Fetch role details if editing
  useEffect(() => {
    if (isEditMode && getApi) {
      const fetchRole = async () => {
        try {
          const response = await getApi(`${API.GET_ROLE}/${roleId}`);
          if (response?.data) {
            formik.setValues({
              role_name: response.data.role_name || "",
              role_status: response.data.role_status || "",
              details: response.data.details || "",
            });
          }
        } catch (error) {
          ToastMessage("error", "Failed to fetch role details.");
        }
      };

      fetchRole();
    }
  }, [isEditMode, getApi]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }

      let response;

      if (isEditMode) {
        response = await postApi(`${API.UPDATE_ROLE}/${roleId}`, values);
      } else {
        response = await postApi(API.CREATE_ROLE, values);
      }

      if (response?.error) {
        ToastMessage("error", response?.message);
      } else {
        router.push(ROUTE.TEAM_MANAGEMENT);
        ToastMessage(
          "success",
          isEditMode ? "Role updated successfully!" : ERROR_TEXT.MEMBER_ADDED
        );
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
    onSubmit,
    enableReinitialize: true,
  });

  const { setFieldValue, values, handleSubmit, touched, errors, isSubmitting } =
    formik;

  const REGISTER_FORM = [
    {
      id: "role_name",
      label: "Enter Role",
      component: "TEXT",
    },
    {
      id: "role_status",
      label: "Status",
      component: "SELECT",
      options: [
        { label: "Active", value: 1 },
        { label: "In-Active", value: 2 },
      ],
    },
    {
      id: "details",
      label: "Enter Details",
      component: "TEXT_AREA",
    },
  ];

  return (
    <Fragment>
      <PageHeader
        text={isEditMode ? "Edit Role" : "Assign Task"}
        buttonText="Back"
        onButtonClick={() => router.back()}
        icon={
          <ArrowBackIcon
            height={20}
            width={20}
            style={{ marginBottom: "3px" }}
          />
        }
      />

      <Paper className="mt-5 min-h-[60vh] p-12 bg-white shadow-md rounded-lg">
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
          <div className="flex justify-end col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-4">
            <button
              type="submit"
              className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out "
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Submitting..."
                : isEditMode
                ? "Update"
                : "Submit"}
            </button>
          </div>
        </StyledForm>
      </Paper>
    </Fragment>
  );
};

export default withLayout(AddRole);
