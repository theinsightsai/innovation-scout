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
  operation: "",
  log_date: new Date(),
  action_performed: "",
  details: "",
};

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const validationSchema = Yup.object({
  operation: Yup.string().required("Operation is required"),
  log_date: Yup.date().required("Log date is required"),
  action_performed: Yup.string().required("Action performed is required"),
  details: Yup.string().required("Details are required"),
});

const AddEditLogs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [apiMethod, setApiMethod] = useState("POST");
  const [postApi, setPostApi] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("id==>", id);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi, getApi, putApi } = await import("@/app/api/clientApi");
      setPostApi(() => ({ post: postApi, get: getApi, put: putApi }));
      setLoading(false);
    };

    loadApi();
  }, []);

  useEffect(() => {
    if (id) {
      setApiMethod("PUT"); // If editing, switch to PUT method
      fetchLogData(id);
    }
  }, [id]);

  const fetchLogData = async (logId) => {
    try {
      if (!postApi?.get) return;
      const response = await postApi.get(`${API.GET_LOGS}/${logId}`);

      if (!response.error) {
        formik.setValues({
          operation: response.data.operation || "",
          log_date: new Date(response.data.log_date) || new Date(),
          action_performed: response.data.action_performed || "",
          details: response.data.details || "",
        });
      } else {
        ToastMessage("error", "Failed to load log details.");
      }
    } catch (error) {
      ToastMessage("error", "Something went wrong while fetching the log.");
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }

      const apiEndpoint = id ? `${API.UPDATE_LOG}/${id}` : API.ADD_LOG;
      const apiCall = id ? postApi.put : postApi.post;

      const response = await apiCall(apiEndpoint, values);

      if (response?.error) {
        ToastMessage("error", response?.message);
      } else {
        router.push(ROUTE.LOGS);
        ToastMessage(
          "success",
          id ? "Log updated successfully!" : "Log added successfully!"
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
    enableReinitialize: true, // Ensures form updates when data is loaded
  });

  const { setFieldValue, values, handleSubmit, touched, errors, isSubmitting } =
    formik;

  const FORM_FIELDS = [
    {
      id: "operation",
      label: "Operation",
      component: "SELECT",
      options: [
        { label: "User Deleted", value: "user_deleted" },
        { label: "Password Updated", value: "password_updated" },
        { label: "Role Assigned", value: "role_assigned" },
        { label: "User Created", value: "user_created" },
        { label: "Email Updated", value: "email_updated" },
        { label: "User Suspended", value: "user_suspended" },
      ],
    },
    {
      id: "log_date",
      label: "Log Date",
      component: "DATE_PICKER",
    },
    {
      id: "action_performed",
      label: "Action Performed By",
      component: "SELECT",
      options: [
        { label: "Jimmy", value: "jimmy" },
        { label: "Sophia", value: "sophia" },
        { label: "Michael", value: "michael" },
        { label: "Rachel", value: "rachel" },
        { label: "David", value: "david" },
        { label: "Olivia", value: "olivia" },
      ],
    },
    {
      id: "details",
      label: "Enter Details",
      component: "TEXT_AREA",
    },
  ];

  return (
    <div className="flex flex-col">
      <PageHeader
        text={Boolean(id) ? "Edit Log" : "Add Log"}
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

      <Paper className="flex-grow mt-5 min-h-[60vh] p-12 bg-white shadow-md rounded-lg">
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FORM_FIELDS.map((fieldObj) => (
            <FormController
              key={fieldObj?.id}
              fieldObj={fieldObj}
              values={values}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          ))}
        </StyledForm>
      </Paper>

      <div className="mt-auto p-4 bg-white shadow-md w-full flex justify-end">
        <button
          type="submit"
          className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out"
        >
          {isSubmitting
            ? "Submitting..."
            : Boolean(id)
            ? "Update Log"
            : "Add Log"}
        </button>
      </div>
    </div>
  );
};

export default withLayout(AddEditLogs);
