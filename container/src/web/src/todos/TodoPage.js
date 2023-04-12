import { Box } from "@mui/material";
import TodoList from "./TodoList";
import RequireAuth from "../auth/RequireAuth";

export default function TodoPage() {
    return (
        <RequireAuth>
            <Box>
                <h1>Todos</h1>
                <TodoList />
            </Box>
        </RequireAuth>
    );
}
