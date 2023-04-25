import { Loader, Checkbox, Box, ActionIcon, Title, Text } from "@mantine/core";

import { DataGrid } from "mantine-data-grid";
import { IconTrash } from "@tabler/icons-react";

import { useUsers, useDelUser, useSetUserActive, useSetSuperuser } from "@/util.js";

export default function UserManager() {
    const users = useUsers();
    const delUser = useDelUser();
    const setUserActive = useSetUserActive();
    const setSuperuser = useSetSuperuser();

    if (users.isLoading) return <Loader />;

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            size: 250,
            cell: (cell) => <Text fx="xs">{cell.row.original.id}</Text>,
        },
        {
            header: "Email",
            accessorKey: "email",
            size: 150,
        },
        {
            header: "Active",
            accessorKey: "is_active",
            size: 100,
            cell: (cell) => (
                <Checkbox
                    value={cell.getValue()}
                    checked={cell.getValue()}
                    disabled={setUserActive.isLoading}
                    onChange={() => setUserActive.mutate({ id: cell.row.original.id, is_active: !cell.getValue() })}
                />
            ),
        },
        {
            header: "Superuser",
            accessorKey: "is_superuser",
            size: 100,
            cell: (cell) => (
                <Checkbox
                    data-testid={`toggleSuperuser-${cell.row.original.email}`}
                    value={cell.getValue()}
                    checked={cell.getValue()}
                    disabled={setSuperuser.isLoading}
                    onChange={() => setSuperuser.mutate({ id: cell.row.original.id, is_superuser: !cell.getValue() })}
                />
            ),
        },
        {
            header: "Delete",
            size: 100,
            cell: (cell) => {
                console.log(cell.row.original.id);
                return (
                    <ActionIcon
                        data-testid={`delete-${cell.row.original.email}`}
                        onClick={() => delUser.mutate(cell.row.original.id)}
                        label="Delete"
                    >
                        <IconTrash />
                    </ActionIcon>
                );
            },
        },
    ];

    return (
        <Box>
            <Title order={2}>Manage Users</Title>
            <DataGrid columns={columns} data={users.data} />
        </Box>
    );
}
