export const geTypeByRoleId = (roleId) => {
  console.log("roleId==>", roleId);
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
