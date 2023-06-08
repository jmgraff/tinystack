import { useContext } from "react";

import { Box, Navbar, NavLink, Loader, Title, Text } from "@mantine/core";
import { IconListCheck, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

import { Link } from "next/link";

import { useUser, useLogout } from "@/util.js";

export default function Nav() {
    return (
        <Navbar width={{ base: 250 }} p="lg">
            <Navbar.Section grow mt="md">
                <NavLink icon={<IconListCheck />} label="Todos" component="a" href="/todos" />
            </Navbar.Section>
            <Navbar.Section mt="md">
                <h6>Navbar Bottom</h6>
            </Navbar.Section>
        </Navbar>
    );
}
