import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Chip, Tooltip, Avatar, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

// Function to get Chip color based on status
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

const columns = [
    { id: 'id', label: 'User ID', minWidth: 100 },
    { id: 'name', label: 'Full Name', minWidth: 170 },
    { id: 'role', label: 'Role', minWidth: 150 },
    {
        id: 'createdAt',
        label: 'Registered Date',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 150,
        align: 'center',
    }
];

// Function to create user data
function createData(id, name, email, role, createdAt, status) {
    return {
        id,
        name,
        email,
        role,
        createdAt: new Date(createdAt).toLocaleDateString('en-US'),
        status
    };
}

// Sample user data
const rows = [
    createData(1, 'John Doe', 'john@example.com', 'Admin', '2024-01-15T12:30:00Z', 'Active'),
    createData(2, 'Jane Smith', 'jane@example.com', 'User', '2024-02-10T09:15:00Z', 'Inactive'),
    createData(3, 'Mike Johnson', 'mike@example.com', 'Client', '2023-12-20T18:45:00Z', 'Active'),
    createData(4, 'Emma Brown', 'emma@example.com', 'User', '2024-01-28T14:00:00Z', 'Banned'),
    createData(5, 'William Davis', 'william@example.com', 'Admin', '2024-02-01T08:00:00Z', 'Active'),
    createData(6, 'Sophia Wilson', 'sophia@example.com', 'Client', '2024-01-10T10:20:00Z', 'Inactive'),
    createData(7, 'Daniel Martinez', 'daniel@example.com', 'User', '2023-12-05T16:30:00Z', 'Active'),
    createData(8, 'Olivia Taylor', 'olivia@example.com', 'Admin', '2024-02-18T11:45:00Z', 'Active'),
    createData(9, 'James Anderson', 'james@example.com', 'Client', '2024-01-22T15:00:00Z', 'Banned'),
    createData(10, 'Charlotte Moore', 'charlotte@example.com', 'User', '2023-11-30T07:10:00Z', 'Active'),
];

export default function CustomTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '50px' }}>
            <TableContainer sx={{ maxHeight: 600, minHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontFamily: "Outfit, sans-serif",
                                        background: 'lightgray',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        let value = row[column.id];

                                        // Render Full Name with Avatar and Email
                                        if (column.id === "name") {
                                            value = (
                                                <div className="flex items-center">
                                                    <Avatar alt={row.name} src="https://picsum.photos/200" sx={{ marginRight: 2 }} />
                                                    <div>
                                                        <Typography variant="body1">{row.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary">{row.email}</Typography>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        // Render Chip for status column
                                        if (column.id === "status") {
                                            value = <Chip label={row.status} color={getChipByStatus(row.status)} variant='outlined' />;
                                        }

                                        // Render Action column
                                        if (column.id === "action") {
                                            value = (
                                                <>
                                                    <Tooltip title="Edit">
                                                        <CreateIcon className="cursor-pointer hover:text-[#005B96]" />
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <DeleteIcon className="cursor-pointer hover:text-[#005B96]" />
                                                    </Tooltip>
                                                </>
                                            );
                                        }

                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
