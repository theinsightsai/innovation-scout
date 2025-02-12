"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Fragment } from "react";
import withLayout from "@/components/hoc/withLayout";
import { PageHeader } from "@/components";
import { Paper, Checkbox } from "@mui/material";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import { ERROR_TEXT, ROUTE } from "@/constants";
import { API } from "@/app/api/apiConstant";
import ToastMessage from "@/components/ToastMessage";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const roles = [
  "Logs",
  "Task Management",
  "User Management",
  "Team Management",
  "Role Management",
];
const permissions = ["View", "Add", "Edit", "Delete"];

const FormController = dynamic(() => import("@/components/FormController"), {
  ssr: false,
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  status: "",
  permissions: {
    Logs: { View: false, Add: false, Edit: false, Delete: false },
    "Task Management": { View: false, Add: false, Edit: false, Delete: false },
    "User Management": { View: false, Add: false, Edit: false, Delete: false },
    "Team Management": { View: false, Add: false, Edit: false, Delete: false },
    "Role Management": { View: false, Add: false, Edit: false, Delete: false },
  },
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
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const AddEditMember = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the user ID from the URL
  const isEditMode = Boolean(id); // Determine if we are in edit mode

  const [postApi, setPostApi] = useState(null);
  const [getApi, setGetApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi, putApi, getApi } = await import("@/app/api/clientApi");
      setPostApi(() => postApi);
      setGetApi(() => getApi);
      setLoading(false);
    };
    loadApi();
  }, []);

  useEffect(() => {
    if (isEditMode && getApi) {
      fetchUserData();
    }
  }, [isEditMode, getApi]);

  const fetchUserData = async () => {
    console.log(`${API.GET_USER_BY_ID}/${id}`);

    try {
      setLoading(true);
      const response = await getApi(`${API.GET_USER_BY_ID}/${id}`);
      if (!response.error) {
        const {
          data: { data },
        } = response;
        if (data) {
          formik.setValues({
            name: data?.name || "",
            email: data?.email || "",
            password: data?.password || "",
            confirmPassword: data?.password || "",
            status: data?.status || "",
            permissions: data.permissions || initialValues.permissions,
          });
        }
      } else {
        ToastMessage("error", response.message);
      }
    } catch (error) {
      console.log("error==>", error);
      ToastMessage("error", "Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }
      const apiUrl = isEditMode ? `${API.UPDATE_USER}` : API.CREATE_USER;

      let payload = {
        name: values?.name,
        email: values?.email,
        password: values?.password || "",
        status: values?.status,
        role_id: 2,
        image: "",
      };

      if (isEditMode) {
        payload = {
          user_id: id,
          ...payload,
        };
      }

      const response = await postApi(apiUrl, {
        ...payload,
      });
      if (response?.error) {
        ToastMessage("error", response?.message);
      } else {
        router.push(ROUTE.TEAM_MANAGEMENT);
        ToastMessage("success", isEditMode ? "Member Updated" : "Member Added");
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

  console.log("outer values==>", values);

  const REGISTER_FORM = [
    { id: "name", label: "Name", component: "TEXT" },
    { id: "email", label: "Email Address", component: "TEXT" },
    {
      id: "status",
      label: "Status",
      component: "SELECT",
      options: [
        { label: "Active", value: 1 },
        { label: "In-Active", value: 0 },
      ],
    },
    { id: "password", label: "Password", component: "PASSWORD" },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      component: "PASSWORD",
    },
  ];

  const handlePermissionChange = (role, permission) => {
    setFieldValue(
      `permissions.${role}.${permission}`,
      !values.permissions[role][permission]
    );
  };

  return (
    <Fragment>
      <PageHeader
        text={isEditMode ? "Edit Team Member" : "Add Team Member"}
        buttonText="Back"
        onButtonClick={() => router.back()}
        icon={<ArrowBackIcon height={20} width={20} />}
      />
      <Paper className="mt-5 min-h-[60vh] p-12 bg-white shadow-md rounded-lg">
        <StyledForm
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

          <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
            <div className="text-4xl">Permissions</div>
            <table className="mt-7" style={{ width: "40%" }}>
              <thead>
                <tr>
                  <th className="p-3 text-start">Role</th>
                  {permissions.map((perm) => (
                    <th key={perm} className="p-3 text-start">
                      {perm}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role}>
                    <td className="p-3 font-medium text-start">{role}</td>
                    {permissions.map((perm) => (
                      <td key={perm} className="p-3 text-start">
                        <Checkbox
                          color="primary"
                          checked={values?.permissions[role][perm]}
                          onChange={() => handlePermissionChange(role, perm)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-4">
            <button
              type="submit"
              className="gap-1 flex justify-center items-center bg-[#005B96] border-2 border-[#005B96] rounded-[5px] text-white  text-lg font-semibold no-underline p-2 px-5 hover:bg-white hover:text-[#005B96] hover:border-[#005B96] transition duration-300 ease-in-out "
            >
              {isSubmitting
                ? "Processing..."
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

export default withLayout(AddEditMember);
