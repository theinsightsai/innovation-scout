"use client";
import { Fragment, useState, useEffect } from "react";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import withLayout from "@/components/hoc/withLayout";
import { useRouter } from "next/navigation";
import {
  ROUTE,
  TABEL_ACTION,
  ROLE_ID_BY_NAME,
  ASSEST_BASE_URL,
} from "@/constants";
import { getApi } from "@/app/api/clientApi";
import { API } from "@/app/api/apiConstant";
import { useSelector } from "react-redux";
import ToastMessage from "@/components/ToastMessage";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { formatDate } from "@/utils";

const createData = (
  id,
  username,
  email,
  created_at,
  status,
  title,
  image,
  priority,
  description
) => {
  return {
    id,
    username,
    email,
    created_at: formatDate(created_at),
    task_status: status,
    image: image ? `${ASSEST_BASE_URL}${image}` : null,
    title,
    taskPriority: priority,
    description,
  };
};

const TaskManagement = () => {
  const router = useRouter();
  const role_id = useSelector((state) => state?.auth?.role_id);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [postApi, setPostApi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApi = async () => {
      const { postApi } = await import("@/app/api/clientApi");
      setPostApi(() => postApi);
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
      router.push(`${ROUTE.TASK_MANAGEMENT}${ROUTE.ADD_EDIT}?id=${row?.id}`);
    } else {
      setOpenConfirmation(true);
      setSelectedData({ ...row });
    }
  };

  const handleConfirmClick = async () => {
    try {
      setLoading(true);
      if (!postApi) {
        ToastMessage("error", ERROR_TEXT.API_LOAD_ERROR);
        return;
      }
      const response = await postApi(`${API.DELETE_TASK}`, {
        id: selectedData?.id,
      });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(
          `${API.GET_TASK_LIST}?limit=${rowsPerPage}&page=${page + 1}`
        );
        const taskList = response?.data?.data?.data;

        if (!response.error) {
          const formattedData = taskList?.map((user) =>
            createData(
              user.id,
              user.assign_to?.name,
              user.assign_to?.email,
              user.created_at,
              user.status,
              user.title,
              user.assign_to?.image,
              user.priority,
              user.description
            )
          );
          setTotalCount(response?.data?.data?.total);
          setTableData(formattedData);
        } else {
          ToastMessage("error", response.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchData();
  }, [refresh, page, rowsPerPage]);

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
      id: "title",
      label: "Title",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "name",
      label: "Assigned to ",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "taskPriority",
      label: "Task Priority",
      minWidth: 70,
      maxWidth: 70,
      align: "left",
      isVisible: true,
    },

    {
      id: "created_at",
      label: "Assigned Date",
      minWidth: 100,
      maxWidth: 100,
      align: "left",
      isVisible: true,
    },
    {
      id: "task_status",
      label: "Task Status",
      minWidth: 70,
      maxWidth: 70,
      align: "left",
      isVisible: true,
    },

    {
      id: "description",
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
        text="Task Management"
        buttonText={role_id === ROLE_ID_BY_NAME.ADMIN ? "Assign Task" : ""}
        onButtonClick={() =>
          router.push(`${ROUTE.TASK_MANAGEMENT}${ROUTE.ADD_EDIT}`)
        }
        icon={
          <TaskAltIcon height={20} width={20} style={{ marginBottom: "4px" }} />
        }
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
        buttontext="Delete"
        user={{
          user: selectedData?.taskId,
          userType: "Task",
        }}
      />
    </Fragment>
  );
};
export default withLayout(TaskManagement);
