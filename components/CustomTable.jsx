import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'id', label: 'User ID', minWidth: 100 },
    { id: 'name', label: 'Full Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'role', label: 'Role', minWidth: 150 },
    {
        id: 'createdAt',
        label: 'Registered Date',
        minWidth: 170,
        align: 'right',
        format: (value) => new Date(value).toLocaleDateString('en-US'),
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


function createData(id, name, email, role, createdAt, status) {
    return { id, name, email, role, createdAt: new Date(createdAt).toLocaleDateString('en-US'), status };
}

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
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontFamily: "Outfit, sans-serif", background: 'lightgray' }}

                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
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
