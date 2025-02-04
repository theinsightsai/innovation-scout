import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Chip, Tooltip, Avatar, Typography } from "@mui/material";

export const getChipByStatus = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "warning";
    case "Banned":
      return "error";
    default:
      return "default";
  }
};

const NameSection = ({ row }) => {
  return (
    <div className="flex items-center">
      <Avatar alt={row.name} sx={{ marginRight: 2 }}>
        {row?.name?.[0]}
      </Avatar>
      <div>
        <Typography variant="body1">{row.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {row.email}
        </Typography>
      </div>
    </div>
  );
};

export default function CustomTable({
  ACTION_MENU,
  onActionClick,
  columns,
  rows,
  setPage,
  page,
  setRowsPerPage,
  rowsPerPage,
  totalCount,
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ActionSection = ({ ACTION_MENU, row }) => {
    return (
      <>
        {ACTION_MENU.map((actionObj, i) => (
          <Tooltip
            key={i}
            title={actionObj.toolTipLabel}
            onClick={(event) =>
              onActionClick(event, actionObj?.identifier, row)
            }
          >
            {actionObj.icon}
          </Tooltip>
        ))}
      </>
    );
  };

  console.log("page==>", page);
  console.log("rowsPerPage==>", rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
      <TableContainer sx={{ maxHeight: 600, minHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontFamily: "Outfit, sans-serif",
                    background: "lightgray",
                    textTransform: "uppercase",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows?.length > 0 ? (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column, ind) => {
                    if (column.id === "name") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            maxWidth: column.maxWidth,
                            minWidth: column.minWidth,
                          }}
                        >
                          <NameSection row={row} />
                        </TableCell>
                      );
                    }

                    if (column.id === "action") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            maxWidth: column.maxWidth,
                            minWidth: column.minWidth,
                          }}
                        >
                          <ActionSection ACTION_MENU={ACTION_MENU} row={row} />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          maxWidth: column.maxWidth,
                          minWidth: column.minWidth,
                        }}
                      >
                        {column.id === "created_at"
                          ? row[column.id]
                          : index + 1}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <div
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    No Data Found
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
