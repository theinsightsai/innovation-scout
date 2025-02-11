"use client";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Project Import
import withLayout from "@/components/hoc/withLayout";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import { ERROR_TEXT, ROUTE, TABEL_ACTION } from "@/constants";
import { getApi } from "@/app/api/clientApi";
import { API } from "@/app/api/apiConstant";
import { formatDate } from "@/utils";
import ToastMessage from "@/components/ToastMessage";

// Material UI import
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const UserManagement = () => {
  const router = useRouter();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteApi, setDeleteApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  console.log("page==>", page);
  console.log("totalCount==>", totalCount);
  console.log("rowsPerPage==>", rowsPerPage);

  useEffect(() => {
    const loadApi = async () => {
      const { deleteApi } = await import("@/app/api/clientApi");
      setDeleteApi(() => deleteApi);
      setLoading(false);
    };

    loadApi();
  }, []);

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

  const handleConfirmClick = async () => {
    try {
      setLoading(true);
      if (!deleteApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }
      const response = await deleteApi(
        `${API.DELETE_USER}/${selectedData?.id}`
      );
      if (response?.error) {
        ToastMessage("error", response?.message);
      } else if (!response?.error) {
        setRefresh(!refresh);
        ToastMessage("success", response?.data?.message);
      }
    } catch (error) {
      ToastMessage("error", ERROR_TEXT.SOMETHING_WENT_WRONG);
    } finally {
      handleCloseModal();
      setLoading(false);
    }
  };

  const createData = (id, username, email, created_at, status) => {
    return {
      id,
      username,
      email,
      created_at: formatDate(created_at),
      email_verified: status === 1 ? "Active" : "In-Active",
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(`${API.GET_USERS}/3`);

        console.log(
          "response?.data?.data?.data==>",
          response?.data?.data?.data
        );

        if (!response.error) {
          const formattedData = response?.data?.data?.data?.map((user) =>
            createData(
              user.id,
              user.name,
              user.email,
              user.created_at,
              user.status
            )
          );
          setTotalCount(response?.data?.data?.total);
          setTableData(formattedData);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchData();
  }, []);
  // page, rowsPerPage, refresh

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
      id: "name",
      label: "Full Name",
      minWidth: 120,
      maxWidth: 120,
      align: "left",
      isVisible: true,
    },
    {
      id: "created_at",
      label: "Registered Date",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "email_verified",
      label: "Email Verification",
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
      isVisible: true,
    },
  ];

  return (
    <Fragment>
      <PageHeader
        text="User Management"
        buttonText=""
        onButtonClick={() =>
          router.push(`${ROUTE.TEAM_MANAGEMENT}${ROUTE.ADD}`)
        }
        icon={<PersonAddAltIcon height={20} width={20} />}
      />
      <CustomTable
        ACTION_MENU={TABEL_ACTION}
        onActionClick={onActionClick}
        columns={COLUMNS}
        rows={tableData}
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
        buttontext={loading ? "Deleting" : "Delete"}
        user={{
          user: selectedData?.username,
          userType: "Client",
        }}
      />
    </Fragment>
  );
};
export default withLayout(UserManagement);
