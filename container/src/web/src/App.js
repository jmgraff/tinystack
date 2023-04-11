import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Container, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav.js";
import AuthPage from "./auth/AuthPage.js";
import HomePage from "./home/HomePage.js";
import TodoPage from "./todos/TodoPage.js";

const queryClient = new QueryClient({});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Container>
                <BrowserRouter>
                    <Nav />
                    <Box sx={{ mt: "1rem" }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/todos" element={<TodoPage />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
            </Container>
        </QueryClientProvider>
    );
}
