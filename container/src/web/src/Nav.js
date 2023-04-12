import { Box, Button, AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { client, logOut } from "./util";

function UserInfo() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(["user"], () => {
        return client.get("/users/me")
            .then((res) => res.data || null)
    });

    const handleLogOut = () => {
        logOut();
        queryClient.invalidateQueries(["user"]);
        navigate("/auth");
    }

    if (isLoading) return <CircularProgress />;

    if (data === null) return <Button color="inherit" component={Link} to="/auth">Log In</Button>

    return <Button color="inherit" onClick={handleLogOut}>Log Out {data.email}</Button>;
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
