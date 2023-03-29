import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Container, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav.js";
import HomePage from "./home/HomePage.js";

const queryClient = new QueryClient({});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Container>
                <BrowserRouter>
                    <Nav />
                    <Box>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
            </Container>
        </QueryClientProvider>
    );
}
