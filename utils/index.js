export const geTypeByRoleId = (roleId) => {
    console.log('roleId==>',roleId)
  switch (roleId) {
    case 1:
      return "Admin";
    case 2:
      return "Team";
    default:
      return "Client";
  }
};
