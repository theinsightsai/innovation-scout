"use client";
import { Fragment, useState, useEffect } from "react";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import withLayout from "@/components/hoc/withLayout";
import { useRouter } from "next/navigation";
import { ROUTE, TABEL_ACTION, ROLE_ID_BY_NAME } from "@/constants";
import { getApi } from "@/app/api/clientApi";
import { API } from "@/app/api/apiConstant";
import { createData } from "@/utils";
import { useSelector } from "react-redux";
import ToastMessage from "@/components/ToastMessage";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const RoleManagement = () => {
  const router = useRouter();
  const role_id = useSelector((state) => state?.auth?.role_id);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  // const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [deleteApi, setDeleteApi] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadApi = async () => {
  //     const { deleteApi } = await import("@/app/api/clientApi");
  //     setDeleteApi(() => deleteApi);
  //     setLoading(false);
  //   };

  //   loadApi();
  // }, []);

  const handleCloseModal = () => {
    setOpenConfirmation(false);
    setSelectedData(null);
  };

  const onActionClick = (event, identifier, row) => {
    if (identifier == "EDIT") {
      router.push(`${ROUTE.ROLE_MANAGEMENT}${ROUTE.ADD_EDIT}?id=${row?.id}`);
    } else {
      setOpenConfirmation(true);
      setSelectedData({ ...row });
    }
  };

  const handleConfirmClick = () => {
    alert("Working over this functionality");
    // async
    // try {
    //   setLoading(true);
    //   if (!deleteApi) {
    //     ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
    //     return;
    //   }
    //   const response = await deleteApi(
    //     `${API.DELETE_USER}/${selectedData?.id}`
    //   );
    //   if (response?.error) {
    //     ToastMessage("error", response?.message);
    //   } else if (!response?.error) {
    //     setRefresh(!refresh);
    //     ToastMessage("success", response?.data?.message);
    //   }
    // } catch (error) {
    //   ToastMessage("error", ERROR_TEXT.SOMETHING_WENT_WRONG);
    // } finally {
    //   handleCloseModal();
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const role_id = "2";
  //       const response = await getApi(
  //         `${API.GET_USERS}?role_id=${role_id}&page=${
  //           page + 1
  //         }&per_page=${rowsPerPage}`
  //       );

  //       if (!response.error) {
  //         const formattedData = response?.data?.data?.map((user) =>
  //           createData(user.id, user.username, user.email, user.created_at)
  //         );
  //         setTotalCount(response?.data?.pagination?.total_items);
  //         setRows(formattedData);
  //       } else {
  //         console.error(response.message);
  //       }
  //     } catch (error) {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   };

  //   fetchData();
  // }, [page, rowsPerPage, refresh]);

  const rows = [
    {
      id: 1,
      roleId: 2,
      created_at: "Tue, 02 February 2025",
      roleStatus: 2,
      roleDesc:
        "Update the name and email for client XYZ – Task to modify client XYZ's personal details.",
    },
    {
      id: 2,
      roleId: 3,
      created_at: "Tue, 03 February 2025",
      roleStatus: 1,
      roleDesc:
        "Update the password for client XYZ – Task to reset the password for client XYZ's account.",
    },
  ];

  const COLUMNS = [
    {
      id: "sno",
      label: "S.No",
      minWidth: 70,
      maxWidth: 70,
      align: "left",
      isVisible: true,
    },
    {
      id: "roleId",
      label: "Role",
      minWidth: 120,
      maxWidth: 120,
      align: "left",
      isVisible: true,
    },

    {
      id: "created_at",
      label: "Created Date",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "roleStatus",
      label: "Role Status",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "roleDesc",
      label: "Details",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "action",
      label: "Action",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: role_id === ROLE_ID_BY_NAME.ADMIN,
    },
  ];

  return (
    <Fragment>
      <PageHeader
        text="Role Management"
        buttonText={"Add Role"}
        onButtonClick={() =>
          router.push(`${ROUTE.ROLE_MANAGEMENT}${ROUTE.ADD_EDIT}`)
        }
        icon={
          <ManageAccountsIcon
            height={20}
            width={20}
            style={{ marginBottom: "4px" }}
          />
        }
      />
      <CustomTable
        ACTION_MENU={TABEL_ACTION}
        onActionClick={onActionClick}
        columns={COLUMNS}
        rows={rows}
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
      />
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseModal}
        handleConfirmClick={handleConfirmClick}
        buttontext="Delete"
        user={{
          user: selectedData?.taskId,
          userType: "Role",
        }}
      />
    </Fragment>
  );
};
export default withLayout(RoleManagement);
