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
  MEMBER_ADDED: "Team Member Added Successfully",
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

export const ROLE_ID_BY_NAME = {
  ADMIN: 1,
  TEAM: 2,
  CLIENT: 3,
};
