"use client";
import { Fragment, useState, useEffect } from "react";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import withLayout from "@/components/hoc/withLayout";
import { useRouter } from "next/navigation";
import { ROUTE, TABEL_ACTION, ROLE_ID_BY_NAME, FONT_STYLES } from "@/constants";
import { getApi } from "@/app/api/clientApi";
import { API } from "@/app/api/apiConstant";
import { createData } from "@/utils";
import { useSelector } from "react-redux";
import ToastMessage from "@/components/ToastMessage";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FeedIcon from "@mui/icons-material/Feed";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const Logs = () => {
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

  const [filterValue, setFilterValue] = useState({
    search: "",
    action: "",
  });
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
      router.push(`${ROUTE.LOGS}${ROUTE.ADD_EDIT}?id=${row?.id}`);
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
      id: "123",
      logAction: "User Deleted",
      created_at: "Tue, 02 February 2025",
      actionPerfomedBy: "Jimmy",
      actionDesc: "User XYZ deleted",
    },
    {
      id: "456",
      logAction: "Password Updated",
      created_at: "Tue, 03 February 2025",
      actionPerfomedBy: "Sophia",
      actionDesc: "Password updated for User ABC",
    },
    {
      id: "789",
      logAction: "Role Assigned",
      created_at: "Wed, 04 February 2025",
      actionPerfomedBy: "Michael",
      actionDesc: "Assigned 'Admin' role to User DEF",
    },
    {
      id: "1011",
      logAction: "User Created",
      created_at: "Thu, 05 February 2025",
      actionPerfomedBy: "Rachel",
      actionDesc: "New User GHI created with 'Client' role",
    },
    {
      id: "1213",
      logAction: "Email Updated",
      created_at: "Fri, 06 February 2025",
      actionPerfomedBy: "David",
      actionDesc: "Updated email for User XYZ to newemail@example.com",
    },
    {
      id: "1314",
      logAction: "User Suspended",
      created_at: "Sat, 07 February 2025",
      actionPerfomedBy: "Olivia",
      actionDesc: "Suspended User JKL for policy violation",
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
      id: "logAction",
      label: "Action",
      minWidth: 120,
      maxWidth: 120,
      align: "left",
      isVisible: true,
    },

    {
      id: "created_at",
      label: "log Date",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "actionPerfomedBy",
      label: "Perfomed By",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "actionDesc",
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

  const OPTIONS = [
    { label: "User Deleted", value: "user_deleted" },
    { label: "Password Updated", value: "password_updated" },
    { label: "Role Assigned", value: "role_assigned" },
    { label: "User Created", value: "user_created" },
    { label: "Email Updated", value: "email_updated" },
    { label: "User Suspended", value: "user_suspended" },
  ];

  return (
    <Fragment>
      <PageHeader
        text="Logs"
        buttonText={"Add Logs"}
        onButtonClick={() => router.push(`${ROUTE.LOGS}${ROUTE.ADD_EDIT}`)}
        icon={
          <FeedIcon height={20} width={20} style={{ marginBottom: "4px" }} />
        }
      />
      <div className="grid grid-cols-1 mt-7 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <FormControl fullWidth>
          <InputLabel id={"filter-by-action"}>Filter By Action</InputLabel>
          <Select
            labelId={"filter-by-action"}
            id={"filter-by-action"}
            value={filterValue.action}
            label="Filter By Action"
            onChange={(event) =>
              setFilterValue({
                ...filterValue,
                action: event.target.value,
              })
            }
          >
            {OPTIONS.map((obj, i, arr) => {
              return (
                <MenuItem
                  key={`${obj.value}-${i}`}
                  value={obj.value}
                  style={{ ...FONT_STYLES }}
                >
                  {obj.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          key="search"
          variant="outlined"
          margin="normal"
          fullWidth
          id="search"
          label="Search"
          name="search"
          autoComplete="search"
          onChange={(event) =>
            setFilterValue({
              ...filterValue,
              search: event.target.value,
            })
          }
          autoFocus
          value={filterValue.search}
          style={{ ...FONT_STYLES, marginTop: "0px" }}
        />
      </div>

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
          user: "this Log",
          userType: "Log",
        }}
      />
    </Fragment>
  );
};
export default withLayout(Logs);
