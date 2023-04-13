import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Container, Box, CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav.js";
import AuthPage from "./auth/AuthPage.js";
import HomePage from "./home/HomePage.js";
import TodoPage from "./todos/TodoPage.js";
import SettingsPage from "./settings/SettingsPage.js";
import { queryClient, AuthLoader } from "./util";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Container sx={{ mt: "1rem" }}>
                <AuthLoader
                    renderLoading={() => <CircularProgress />}
                    renderUnauthenticated={() => <AuthPage />}
                >
                    <BrowserRouter>
                        <Nav />
                        <Box sx={{ mt: "1rem" }}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="/todos" element={<TodoPage />} />
                            </Routes>
                        </Box>
                    </BrowserRouter>
                </AuthLoader>
            </Container>
        </QueryClientProvider>
    );
}
