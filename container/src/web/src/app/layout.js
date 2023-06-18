"use client";

import { ColorSchemeProvider, Loader, MantineProvider, AppShell } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import ReduxProvider from "@/store/ReduxProvider";

import Login from "./Login";
import Nav from "./Nav";
import AppHeader from "./Header";
import AuthLoader from "./AuthLoader";

export default function RootLayout({ children }) {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => 
        setColorScheme(colorScheme === "dark" ? "light" : "dark");

    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <AuthLoader loading={<Loader />} unauthenticated={<Login />}>
                                <AppShell navbar={<Nav />} header={<AppHeader />}>
                                    {children}
                                </AppShell>
                            </AuthLoader>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </ReduxProvider>   
            </body>
        </html>
    );
}