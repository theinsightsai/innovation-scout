import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

import StateChip from "@/components/cards/StateChip";

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
  ADD_EDIT: "/add-edit",
  ADD: "/add",
  TASK_MANAGEMENT: "/task-management",
  LOGS: "/logs",
  ROLE_MANAGEMENT: "/role-management",
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

export const ADMIN_CLIENT_COUNTERS_DATA = [
  {
    title: "Total Clients",
    counts: "2005000",
    description: "",
  },
  {
    title: "Clients Registered (This Month)",
    counts: "150000",
    description: (
      <StateChip text="Compared By last month" isLoses={true} percentage="50" />
    ),
  },
  {
    title: "Clients Registered (This Year)",
    counts: "500000",
    description: (
      <StateChip text="Compared By last year" isLoses={false} percentage="50" />
    ),
  },
  {
    title: "Active Clients",
    counts: "50000",
    description: "",
  },
];

export const ADMIN_TEAM_COUNTERS_DATA = [
  {
    title: "Total Assigned Task",
    counts: "50",
    description: "",
  },
  {
    title: "Pending Task (Total)",
    counts: "10",
    description: "",
  },
  {
    title: "Pending Task (This Month)",
    counts: "3",
    description: "",
  },
  {
    title: "Completed Task (This Month)",
    counts: "15",
    description: "",
  },
];

export const TEAM_COUNTERS_DATA = [
  {
    title: "Total Assigned Task",
    counts: "50",
    description: "",
  },
  {
    title: "Completed Task (Total)",
    counts: "15",
    description: "",
  },
  {
    title: "Pending Task (Total)",
    counts: "10",
    description: "",
  },
  {
    title: "Pending Task (This Month)",
    counts: "3",
    description: "",
  },
];

export const FONT_STYLES = {
  fontFamily: "Outfit, sans-serif",
};

export const ACTION_IDENTIFIER = {
  ADD: "add",
  EDIT: "edit",
  CLONE: "clone",
  DELETE: "delete",
};
