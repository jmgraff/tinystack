import { createContext, useState, useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { ColorSchemeProvider, Loader, MantineProvider, Container, Box, Grid, AppShell } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { AuthLoader, queryClient } from "@/util.js";
import Login from "@/components/auth/Login.js";
import Nav from "@/components/Nav.js";
import Header from "@/components/Header.js";

export default function Layout({ children }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => setColorScheme(colorScheme === "dark" ? "light" : "dark");

    console.log("Color scheme is:", colorScheme);

    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    <AuthLoader renderLoading={() => <Loader />} renderUnauthenticated={() => <Login />}>
                        <AppShell navbar={<Nav />} header={<Header />}>
                            {children}
                        </AppShell>
                    </AuthLoader>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    );
}
