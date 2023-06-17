"use client";
import { Box, Title } from "@mantine/core";
import TodoList from "./TodoList";

export default function TodoPage() {
    return (
        <Box>
            <Title order={2}>Todos</Title>
            <TodoList />
        </Box>
    );
}
