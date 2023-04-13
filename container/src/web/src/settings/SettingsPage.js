import UserManager from "../auth/UserManager";
import CreateUserForm from "../auth/CreateUserForm";

export default function SettingsPage() {
    return (
        <>
            <UserManager />
            <CreateUserForm />
        </>
    );
}
