import { Box, CircularProgress, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useUser, useUsers, useDelUser, useSetUserActive, useSetSuperuser } from "../util";

export default function UserManager() {
    const user = useUser();
    const users = useUsers();
    const delUser = useDelUser();
    const setUserActive = useSetUserActive();
    const setSuperuser = useSetSuperuser();

    if (users.isLoading || user.isLoading) return <CircularProgress />;
    if (!user.data.is_superuser) return null;

    const columns = [
        { field: "id", width: 300 },
        { field: "email", width: 200 },
        {
            field: "is_active",
            width: 100,
            renderCell: ({ value, row }) => <Checkbox
                value={value}
                checked={value}
                onChange={() => setUserActive.mutate({id: row.id, is_active: !value})}
            />
        },
        {
            field: "is_superuser",
            width: 100,
            renderCell: ({ value, row }) => (
                <Checkbox
                    value={value}
                    checked={value}
                    onChange={() => setSuperuser.mutate({id: row.id, is_superuser: !value})}
                />
            )
        },
        {
            field: "actions",
            type: "actions",
            width: 250,
            getActions: ({ row: { id }}) => [
                <GridActionsCellItem
                    onClick={() => delUser.mutate(id)}
                    icon={<DeleteIcon />}
                    label="Delete"
                />
            ],
        }
    ];

    return (
        <>
            <h1>Manage Users</h1>
            <Box sx={{height: "20rem"}}>
                <DataGrid
                    columns={columns}
                    rows={users.data}
                />
            </Box>
        </>
    );
}
