import { Navbar, NavLink } from "@mantine/core";
import { IconListCheck } from "@tabler/icons-react";
import Link from "next/link";

export default function Nav() {
    return (
        <Navbar width={{ base: 250 }} p="lg">
            <Navbar.Section grow mt="md">
                <NavLink icon={<IconListCheck />} label="Todos" component={Link} href="/todos" />
            </Navbar.Section>
            <Navbar.Section mt="md">
                <h6>Navbar Bottom</h6>
            </Navbar.Section>
        </Navbar>
    );
}
