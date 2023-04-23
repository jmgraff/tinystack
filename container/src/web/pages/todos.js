import { Box } from "@mui/material";
import TodoList from "@/components/todos/TodoList";

export default function TodoPage() {
    return (
        <Box>
            <h1>Todos</h1>
            <TodoList />
        </Box>
    );
}
