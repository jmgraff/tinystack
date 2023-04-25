import { Stack, Loader } from "@mantine/core";

import UserManager from "@/components/auth/UserManager.js";
import CreateUserForm from "@/components/auth/CreateUserForm.js";
import ChangeMyPasswordForm from "@/components/auth/ChangeMyPasswordForm.js";
import { useUser } from "@/util";

export default function SettingsPage() {
    const user = useUser();

    if (user.isLoading) return <Loader />;

    return (
        <Stack>
            <ChangeMyPasswordForm />
            {user.data.is_superuser && (
                <>
                    <CreateUserForm />
                    <UserManager />
                </>
            )}
        </Stack>
    );
}
