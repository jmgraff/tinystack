import { createContext, useState, useEffect } from "react";

import { CssBaseline, Container, Box, CircularProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";

import { AuthLoader, queryClient } from "@/util.js";
import Login from "@/components/auth/Login.js";
import Nav from "@/components/Nav.js";

export const DarkModeContext = createContext({
    isDarkMode: true,
    toggle: () => {},
});

export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    let theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        setDarkMode(localStorage.getItem("darkMode") == "dark" ? true : false);
    }, []);

    useEffect(() => {
        theme = createTheme({
            palette: {
                mode: darkMode ? "dark" : "light",
            },
        });
    }, [darkMode]);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <DarkModeContext.Provider
                    value={{
                        isDarkMode: darkMode,
                        toggle: () => {
                            localStorage.setItem("darkMode", darkMode ? "light" : "dark");
                            setDarkMode(!darkMode);
                        },
                    }}
                >
                    <CssBaseline />
                    <Container>
                        <AuthLoader renderLoading={() => <CircularProgress />} renderUnauthenticated={() => <Login />}>
                            <Nav />
                            {children}
                        </AuthLoader>
                    </Container>
                </DarkModeContext.Provider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
