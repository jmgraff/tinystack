import { Box, Button, AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

import { useUser, useLogout } from "./util";

function UserInfo() {
    const user = useUser();
    const logOut = useLogout();

    if (user.isLoading) return <CircularProgress />;

    return (
        <>
            <Typography>{user.data.email}</Typography>
            <Button color="inherit" component={Link} to="/settings"><SettingsIcon /></Button>
            <Button color="inherit" onClick={() => logOut.mutate()}><LogoutIcon /></Button>
        </>
    );
}

export default function Nav() {
    return (
        <AppBar position="sticky" sx={{ flexGrow: 1 }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    <Typography variant="h6">Tinystack</Typography>
                </Button>
                <Button color="inherit" component={Link} to="/todos">
                    Todo List
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                >
                    <UserInfo />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
