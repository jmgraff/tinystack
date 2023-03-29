import { Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopNav() {
    return (
        <AppBar position="sticky" sx={{ flexGrow: 1 }}>
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    <Typography variant="h6">Tinystack</Typography>
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                >
                    Logged in as Username
                </Box>
            </Toolbar>
        </AppBar>
    );
}
