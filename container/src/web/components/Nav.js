import { useContext } from "react";

import { Navbar, NavLink, Loader, Title } from "@mantine/core";
import { IconLogout, IconSettings, IconUser, IconChecklist } from "@tabler/icons-react";

import { Link } from "next/link";

import { useUser, useLogout } from "@/util.js";
import { DarkModeContext } from "@/components/Layout.js";

function UserControls() {
    const darkModeContext = useContext(DarkModeContext);
    const user = useUser();
    const logOut = useLogout();

    if (user.isLoading) return <Loader />;

    return (
        <NavLink data-testid="usermenu" label={user.data.username} icon={<IconUser />}>
            <NavLink
                color="inherit"
                data-testid="settings"
                label="Settings"
                icon={<IconSettings />}
                component="a"
                href="/api/admin"
            />
            <NavLink data-testid="logout" label="Log Out" onClick={() => logOut.mutate()} icon={<IconLogout />} />
        </NavLink>
    );
}

export default function Nav() {
    return (
        <Navbar width={{ base: 300 }} p="lg" fixed>
            <Navbar.Section>
                <Title order={1}>🥞 tinystack</Title>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
                <NavLink icon={<IconChecklist />} label="Todo List" component="a" href="/todos" />
            </Navbar.Section>
            <Navbar.Section>
                <UserControls />
            </Navbar.Section>
        </Navbar>
    );
}
