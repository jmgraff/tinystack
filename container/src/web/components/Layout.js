import { createContext, useState, useEffect } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { Loader, MantineProvider, Container, Box, Grid, AppShell } from "@mantine/core";

import { AuthLoader, queryClient } from "@/util.js";
import Login from "@/components/auth/Login.js";
import Nav from "@/components/Nav.js";

export const DarkModeContext = createContext({
    isDarkMode: true,
    toggle: () => {},
});

export default function Layout({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <AuthLoader renderLoading={() => <Loader />} renderUnauthenticated={() => <Login />}>
                    <AppShell navbar={<Nav />}>
                        <Box sx={{ width: "50rem" }}>{children}</Box>
                    </AppShell>
                </AuthLoader>
            </MantineProvider>
        </QueryClientProvider>
    );
}
