import { createContext, useState, useEffect } from "react";

import { ColorSchemeProvider, Loader, MantineProvider, Container, Box, Grid, AppShell } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import AuthLoader from "@/components/auth/AuthLoader.js";
import Header from "@/components/Header.js";
import Login from "@/components/auth/Login.js";
import Nav from "@/components/Nav.js";

export default function Layout({ children }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => setColorScheme(colorScheme === "dark" ? "light" : "dark");

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <AuthLoader loading={<Loader />} unauthenticated={<Login />}>
                    <AppShell navbar={<Nav />} header={<Header />}>
                        {children}
                    </AppShell>
                </AuthLoader>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
