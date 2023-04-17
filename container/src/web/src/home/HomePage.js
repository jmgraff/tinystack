import { Box, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <Box>
            <h1>Home</h1>
            <p>Welcome to TinyStack</p>
            <ul>
                <li>
                    <MuiLink to="/todos" component={Link}>
                        Todo List
                    </MuiLink>
                </li>
            </ul>
        </Box>
    );
}
