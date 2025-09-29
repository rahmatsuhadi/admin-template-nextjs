"use client"

import { ArrowDownward, ArrowUpward, Search } from "@mui/icons-material";
import { Box, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";


type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
};


const dummyData: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28, email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34, email: 'jane.smith@example.com' },
    { id: 3, firstName: 'Peter', lastName: 'Jones', age: 45, email: 'peter.jones@example.com' },
    { id: 4, firstName: 'Mary', lastName: 'Johnson', age: 23, email: 'mary.johnson@example.com' },
    { id: 5, firstName: 'Chris', lastName: 'Lee', age: 31, email: 'chris.lee@example.com' },
    { id: 6, firstName: 'Anna', lastName: 'Taylor', age: 29, email: 'anna.taylor@example.com' },
    { id: 7, firstName: 'Mike', lastName: 'Brown', age: 52, email: 'mike.brown@example.com' },
];

export const MaterialUITable = () => {
    const [data] = useState(() => [...dummyData]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 50,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'age',
                header: 'Age',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
        ],
        []
    );



    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        // Handler State
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            {/* Search Bar */}
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search all columns..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </Box>

            {/* Tabel */}
            <TableContainer>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        sx={{
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            '&:hover': { backgroundColor: '#f5f5f5' },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <ArrowUpward fontSize="small" sx={{ ml: 1 }} />,
                                                desc: <ArrowDownward fontSize="small" sx={{ ml: 1 }} />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                component="div"
                count={table.getFilteredRowModel().rows.length}
                page={table.getState().pagination.pageIndex}
                rowsPerPage={table.getState().pagination.pageSize}
                onPageChange={(_, newPage) => table.setPageIndex(newPage)}
                onRowsPerPageChange={(event) => {
                    table.setPageSize(Number(event.target.value));
                }}
                rowsPerPageOptions={[5, 10, 25]}
                showFirstButton
                showLastButton
            />
        </Paper>
    )

}