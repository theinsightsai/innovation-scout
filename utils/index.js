import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

export const geTypeByRoleId = (roleId) => {
  switch (roleId) {
    case 1:
      return "Admin";
    case 2:
      return "Team";
    default:
      return "Client";
  }
};

export const createData = (id, username, email, created_at) => {
  const date = new Date(created_at);

  const isValidDate = !isNaN(date.getTime());

  const formattedDate = isValidDate
    ? `${date.toLocaleString("en-US", { weekday: "short" })}, ${date
        .getDate()
        .toString()
        .padStart(2, "0")} ${date.toLocaleString("en-US", {
        month: "long",
      })} ${date.getFullYear()}`
    : "Invalid Date";

  return {
    id,
    username,
    email,
    created_at: formattedDate,
  };
};

export const getTaskStatusById = (statusId) => {
  switch (statusId) {
    case 1:
      return "Pending";
    case 2:
      return "Completed";
    default:
      return "N/A";
  }
};

export const getRoleStatusById = (roleId) => {
  switch (roleId) {
    case 1:
      return "Active";
    case 2:
      return "In-Active";
    default:
      return "N/A";
  }
};

export const getRoleColorById = (roleId) => {
  switch (roleId) {
    case 1:
      return "success";
    case 2:
      return "error";
    default:
      return "N/A";
  }
};

export const getColorByTaskId = (statusId) => {
  switch (statusId) {
    case 1:
      return "error";
    case 2:
      return "success";
    default:
      return "N/A";
  }
};

export const getRoleNameById = (roleId) => {
  switch (roleId) {
    case 2:
      return "Team";
    case 3:
      return "Client";
    default:
      return "N/A";
  }
};

export const getPriorityById = (priorityId) => {
  switch (priorityId) {
    case 1:
      return "Highest";
    case 2:
      return "High";
    case 3:
      return "Medium";
    case 4:
      return "Low";
    case 5:
      return "Lowest";
    default:
      return "Unknown Priority";
  }
};

export const getPriorityIconById = (priorityId) => {
  switch (priorityId) {
    case 1:
      return <KeyboardDoubleArrowUpIcon sx={{ color: "#D04437" }} />; // Highest
    case 2:
      return <KeyboardArrowUpIcon sx={{ color: "#F79232" }} />; // High
    case 3:
      return <MenuIcon sx={{ color: "#4A6785" }} />; // Medium
    case 4:
      return <KeyboardArrowDownIcon sx={{ color: "#65A637" }} />; // Low
    case 5:
      return <KeyboardDoubleArrowDownIcon sx={{ color: "#999999" }} />; // Lowest
    default:
      return "Unknown Priority";
  }
};
