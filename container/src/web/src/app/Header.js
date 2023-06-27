import { ActionIcon, Button, Box, Header, Title, Group, NavLink, Menu, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";

import { useGetMeQuery, useLogMeOutMutation } from "@/services/users.js";

function UserControls() {
    const user = useGetMeQuery();
    const [logOut] = useLogMeOutMutation();

    return (
        <Menu>
            <Menu.Target>
                <NavLink data-testid="usermenu" label={user.data.username} icon={<IconUser />} variant="filled" />
            </Menu.Target>
            <Menu.Dropdown>
                {user.data.is_staff && (
                    <Menu.Item
                        color="inherit"
                        data-testid="admin"
                        icon={<IconSettings />}
                        component={Link}
                        href="/api/admin/"
                    >
                        Admin
                    </Menu.Item>
                )}
                <Menu.Item data-testid="logout" onClick={logOut} icon={<IconLogout />}>
                    Log Out
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

function DarkModeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <ActionIcon onClick={toggleColorScheme}>
            {colorScheme === "dark" ? <IconSunFilled /> : <IconMoonFilled />}
        </ActionIcon>
    );
}

export default function AppHeader() {
    return (
        <Header height={80} p="1rem">
            <Group sx={{ justifyContent: "space-between" }}>
                <Button
                    component={Link}
                    href="/"
                    h="3rem"
                    variant="subtle"
                    sx={{ color: "inherit", backgroundColor: "inherit" }}
                >
                    <Title order={1}>🥞 tinystack</Title>
                </Button>
                <Group>
                    <Box>
                        <DarkModeButton />
                    </Box>
                    <Box>
                        <UserControls />
                    </Box>
                </Group>
            </Group>
        </Header>
    );
}
