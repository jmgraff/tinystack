import { Box, Title } from "@mantine/core";
import TodoList from "@/components/todos/TodoList";

export default function TodoPage() {
    return (
        <Box>
            <Title order={2}>Todos</Title>
            <TodoList />
        </Box>
    );
}
