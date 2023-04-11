import { useState } from "react";
import { Box, Button, CircularProgress, Input, Checkbox, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import TodoForm from "./TodoForm";
import { client } from "../util";

function Todo({ todo }) {
    const [hovering, setHovering] = useState(false);
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [done, setDone] = useState(todo.done);
    const queryClient = useQueryClient();

    const saveTodo = useMutation(() => client.put(`/todos/${todo.id}`, { id: todo.id, text, done }), {
        onSuccess: () => queryClient.invalidateQueries(["todos"]),
    });

    const deleteTodo = useMutation((todo) => client.delete(`/todos/${todo.id}`), {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    const toggleDone = () => {
        setDone(!done);
        saveTodo.mutate();
    };

    const handleEditOrSave = (save = false) => {
        if (editing && save) {
            saveTodo.mutate();
        } else if (editing && !save) {
            setText(todo.text);
        }
        setEditing(!editing);
    };

    return (
        <Box onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <Checkbox checked={todo.done} onClick={toggleDone} />
            {editing && (
                <Input
                    type="text"
                    value={text}
                    placeholder={text}
                    onKeyDown={(event) => event.keyCode === 13 && handleEditOrSave(true)}
                    onChange={(event) => setText(event.target.value)}
                />
            )}
            {!editing && (
                <Typography display="inline" sx={{ textDecoration: todo.done ? "line-through" : "none" }}>
                    {todo.text}
                </Typography>
            )}
            {editing && <Button onClick={() => handleEditOrSave(true)}>Save</Button>}
            {editing && <Button onClick={() => handleEditOrSave(false)}>Cancel</Button>}
            {!editing && hovering && <Button onClick={() => handleEditOrSave()}>Edit</Button>}
            {!editing && hovering && <Button onClick={() => deleteTodo.mutate(todo)}>Delete</Button>}
        </Box>
    );
}

export default function TodoList() {
    const { data, isLoading } = useQuery(["todos"], () => client.get("/todos").then((res) => res.data));

    if (isLoading) return <CircularProgress />;

    return (
        <ul id="todo-list">
            {data.map((todo) => (
                <li key={todo.id} sx={{ width: "10rem" }}>
                    <Todo todo={todo} />
                </li>
            ))}
            <li>
                <TodoForm />
            </li>
        </ul>
    );
}
