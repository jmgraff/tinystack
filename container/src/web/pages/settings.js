import { Box, CircularProgress } from "@mui/material";

import UserManager from "@/components/auth/UserManager.js";
import CreateUserForm from "@/components/auth/CreateUserForm.js";
import ChangeMyPasswordForm from "@/components/auth/ChangeMyPasswordForm.js";
import { useUser } from "@/util";

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
