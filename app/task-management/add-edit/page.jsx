"use client";
import { useState, useEffect, Fragment } from "react";
import { styled } from "@mui/system";
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
  task_status: "",
  details: "",
};

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const validationSchema = Yup.object({
  task_status: Yup.string().required("Status is required"),
  details: Yup.string().required("Details are required"),
});

const AddEditTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditMode = Boolean(id); // Check if editing or adding a task

  const [apiMethods, setApiMethods] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      try {
        const { postApi, getApi, putApi } = await import("@/app/api/clientApi");
        setApiMethods({ post: postApi, get: getApi, put: putApi });
      } catch (error) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
      } finally {
        setLoading(false);
      }
    };
    loadApi();
  }, []);

  useEffect(() => {
    if (isEditMode && apiMethods?.get) {
      fetchTaskData(id);
    }
  }, [id, apiMethods]);

  const fetchTaskData = async (taskId) => {
    try {
      const response = await apiMethods.get(`${API.GET_TASK}/${taskId}`);
      if (!response.error) {
        formik.setValues({
          task_status: response.data.task_status || "",
          details: response.data.details || "",
        });
      } else {
        ToastMessage("error", "Failed to load task details.");
      }
    } catch (error) {
      ToastMessage("error", "Something went wrong while fetching the task.");
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      if (!apiMethods) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }

      const apiEndpoint = isEditMode ? `${API.UPDATE_TASK}/${id}` : API.ADD_TASK;
      const apiCall = isEditMode ? apiMethods.put : apiMethods.post;

      const response = await apiCall(apiEndpoint, values);

      if (response?.error) {
        ToastMessage("error", response?.message);
      } else {
        router.push(ROUTE.TASKS);
        ToastMessage("success", isEditMode ? "Task updated successfully!" : "Task added successfully!");
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

  const { setFieldValue, values, handleSubmit, touched, errors, isSubmitting } = formik;

  const FORM_FIELDS = [
    {
      id: "task_status",
      label: "Status",
      component: "SELECT",
      options: [
        { label: "Completed", value: 2 },
        { label: "Pending", value: 1 },
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
        text={isEditMode ? "Edit Task" : "Add Task"}
        buttonText="Back"
        onButtonClick={() => router.back()}
        icon={<ArrowBackIcon height={20} width={20} style={{ marginBottom: "3px" }} />}
      />
      <Paper className="mt-5 min-h-[60vh] p-12 bg-white shadow-md rounded-lg">
        <StyledForm noValidate onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FORM_FIELDS.map((fieldObj) => (
            <FormController
              key={fieldObj.id}
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
              className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isEditMode ? "Update Task" : "Add Task"}
            </button>
          </div>
        </StyledForm>
      </Paper>
    </Fragment>
  );
};

export default withLayout(AddEditTask);
