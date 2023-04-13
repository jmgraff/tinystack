import { Box, CircularProgress } from "@mui/material";
import UserManager from "../auth/UserManager";
import CreateUserForm from "../auth/CreateUserForm";
import ChangeMyPasswordForm from "../auth/ChangeMyPasswordForm";
import { useUser } from "../util";

export default function SettingsPage() {
    const user = useUser();

    if (user.isLoading) return <CircularProgress />;

    return (
        <>
            <ChangeMyPasswordForm />
            {user.data.is_superuser && (
                <Box>
                    <UserManager />
                    <CreateUserForm />
                </Box>
            )}
        </>
    );
}
