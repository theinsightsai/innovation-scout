"use client";
import { Fragment, useState, useEffect } from "react";
import { PageHeader, CustomTable, ConfirmationModal } from "@/components";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import withLayout from "@/components/hoc/withLayout";
import { useRouter } from "next/navigation";
import { ROUTE, TABEL_ACTION, COLUMNS } from "@/constants";
import { getApi } from "@/app/api/clientApi";
import { API } from "@/app/api/apiConstant";
import { createData } from "@/utils";

const TeamManagement = () => {
  const router = useRouter();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role_id = "2";
        const response = await getApi(
          `${API.GET_USERS}?role_id=${role_id}&page=${
            page + 1
          }&per_page=${rowsPerPage}`
        );

        if (!response.error) {
          const formattedData = response?.data?.data?.map((user) =>
            createData(user.id, user.username, user.email, user.created_at)
          );
          setTotalCount(response?.data?.pagination?.total_items);
          setRows(formattedData);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchData();
  }, [page, rowsPerPage]);

  return (
    <Fragment>
      <PageHeader
        text="Team Management"
        buttonText="Add Member"
        onButtonClick={() =>
          router.push(`${ROUTE.TEAM_MANAGEMENT}${ROUTE.ADD}`)
        }
        icon={
          <PersonAddAltIcon
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
          user: selectedData,
          userType: "Team Member",
        }}
      />
    </Fragment>
  );
};
export default withLayout(TeamManagement);
