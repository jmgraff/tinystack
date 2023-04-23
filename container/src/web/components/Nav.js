import { useContext } from "react";

import { Box, IconButton, Button, AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import { Link } from "next/link";

import { useUser, useLogout } from "@/util.js";
import { DarkModeContext } from "@/components/Layout.js";

function UserInfo() {
    const darkModeContext = useContext(DarkModeContext);
    const user = useUser();
    const logOut = useLogout();

    if (user.isLoading) return <CircularProgress />;

    return (
        <>
            <Typography>{user.data.email}</Typography>
            <IconButton color="inherit" onClick={() => darkModeContext.toggle()}>
                {darkModeContext.isDarkMode ? <WbSunnyIcon /> : <Brightness3Icon />}
            </IconButton>
            <IconButton color="inherit" data-testid="settings" component={Link} href="/settings">
                <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" data-testid="logout" onClick={() => logOut.mutate()}>
                <LogoutIcon />
            </IconButton>
        </>
    );
}

export default function Nav() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" component={Link} href="/">
                    <Typography variant="h6">Tinystack</Typography>
                </Button>
                <Button color="inherit" component={Link} href="/todos">
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
