import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

export const IMAGES = {
  LOGO: "/assets/logo.webp",
  BANNER: "/assets/main-banner-bg.webp",
  LOGIN_BANNER: "/assets/login-side-banner.webp",
};

export const ROUTE = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  UPLOAD_DATA: "/upload-data",
  ANALYSIS: "/analysis",
  RESULTS: "/results",
  USER_MANAGEMENT: "/user-management",
  TEAM_MANAGEMENT: "/team-management",
  ADD: "/add",
};

export const ERROR_TEXT = {
  TERMS_CONDITIONS: "Please agree to the terms and conditions",
  SUCCESSFULLY_LOGOUT: "Successfully logged out",
  API_LOAD_ERROR: "API is still loading. Please try again.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
};

export const TABEL_ACTION = [
  {
    toolTipLabel: "Edit",
    icon: <CreateIcon className="cursor-pointer hover:text-[#005B96]" />,
    identifier: "EDIT",
  },
  {
    toolTipLabel: "Delete",
    icon: <DeleteIcon className="cursor-pointer hover:text-[#005B96]" />,
    identifier: "DELETE",
  },
];

export const COLUMNS = [
  { id: "sno", label: "S.No", minWidth: 70, maxWidth: 70, align: "left" },
  {
    id: "name",
    label: "Full Name",
    minWidth: 120,
    maxWidth: 120,
    align: "left",
  },
  {
    id: "created_at",
    label: "Registered Date",
    minWidth: 100,
    maxWidth: 100,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
    maxWidth: 100,
    align: "left",
  },
];
