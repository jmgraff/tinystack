import { useContext } from "react";
import { DarkModeContext } from "./App.js";
import { Box, IconButton, Button, AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { Link } from "react-router-dom";

import { useUser, useLogout } from "./util";

function UserInfo() {
    const darkModeContext = useContext(DarkModeContext);
    const user = useUser();
    const logOut = useLogout();

    if (user.isLoading) return <CircularProgress />;

    return (
        <>
            <Typography>{user.data.email}</Typography>
            <IconButton color="inherit" onClick={() => darkModeContext.toggle()}>
                { darkModeContext.isDarkMode ? <WbSunnyIcon /> : <Brightness3Icon /> }
            </IconButton>
            <IconButton color="inherit" component={Link} to="/settings">
                <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => logOut.mutate()}>
                <LogoutIcon />
            </IconButton>
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
