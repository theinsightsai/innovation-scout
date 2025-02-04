"use client";
import { Fragment, useState } from "react";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import withLayout from "@/components/hoc/withLayout";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const ACTION_MENU = [
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

const columns = [
  { id: "sno", label: "S.No", minWidth: 100, maxWidth: 100 },
  { id: "name", label: "Full Name", minWidth: 50, maxWidth: 50 },
  {
    id: "createdAt",
    label: "Registered Date",
    minWidth: 150,
    maxWidth: 150,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    maxWidth: 200,
    align: "center",
  },
];

const UserManagement = () => {
  const router = useRouter();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleCloseModal = () => {
    setOpenConfirmation(false);
    setSelectedData(null);
  };

  const onActionClick = (event, identifier, row) => {
    if (identifier == "EDIT") {
      alert("Edit click");
    } else {
      setOpenConfirmation(true);
      setSelectedData({ ...row });
    }
  };

  const handleConfirmClick = () => {
    alert("Delete APi functionality will be here ");
    handleCloseModal();
  };

  // Function to create user data
  function createData(id, name, email, createdAt) {
    const date = new Date(createdAt);
    const formattedDate = isNaN(date)
      ? "Invalid Date"
      : date.toLocaleDateString("en-US");

    return {
      id,
      name,
      email,
      createdAt: formattedDate,
    };
  }

  // Sample user data
  const rows = [
    createData(
      1,
      "Team Member 1",
      "teamMember@gmail.com",
      "2024-01-15T12:30:00Z"
    ),
  ];

  return (
    <Fragment>
      <PageHeader
        text="Team Management"
        buttonText="Add Member"
        onButtonClick={() =>
          router.push(`${ROUTE.TEAM_MANAGEMENT}${ROUTE.ADD}`)
        }
        icon={<PersonAddAltIcon height={20} width={20} />}
      />
      <CustomTable
        ACTION_MENU={ACTION_MENU}
        onActionClick={onActionClick}
        columns={columns}
        rows={rows}
      />
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseModal}
        handleConfirmClick={handleConfirmClick}
        buttontext="Delete"
        user={{
          user: selectedData,
          userType: "Team Member",
        }}
      />
    </Fragment>
  );
};
export default withLayout(UserManagement);
