import { useState } from "react";

import { Text, TextInput, Checkbox, Loader, Button, Stack, Box, Group } from "@mantine/core";

import TodoForm from "./TodoForm";
import { useGetTodosQuery, useDeleteTodoMutation, usePutTodoMutation } from "@/services/todos.js";

function Todo({ todo }) {
    const [hovering, setHovering] = useState(false);
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [deleteTodo] = useDeleteTodoMutation();
    const [putTodo] = usePutTodoMutation();

    const toggleDone = () => {
        putTodo({ id: todo.id, body: { text, done: !todo.done } });
    };

    const handleEditOrSave = (save = false) => {
        if (editing && save) {
            putTodo({ id: todo.id, body: { text, done: todo.done } });
        } else if (editing && !save) {
            setText(todo.text);
        }
        setEditing(!editing);
    };

    return (
        <Group onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <Checkbox checked={todo.done} onChange={toggleDone} />
            {editing && (
                <TextInput
                    size="xs"
                    value={text}
                    placeholder={text}
                    onKeyDown={(event) => event.keyCode === 13 && handleEditOrSave(true)}
                    onChange={(event) => setText(event.target.value)}
                />
            )}
            {!editing && <Text sx={{ textDecoration: todo.done ? "line-through" : "none" }}>{todo.text}</Text>}
            {editing && (
                <Button onClick={() => handleEditOrSave(true)} size="xs" compact>
                    Save
                </Button>
            )}
            {editing && (
                <Button onClick={() => handleEditOrSave(false)} size="xs" compact>
                    Cancel
                </Button>
            )}
            {!editing && hovering && (
                <Button onClick={() => handleEditOrSave()} size="xs" compact>
                    Edit
                </Button>
            )}
            {!editing && hovering && (
                <Button onClick={() => deleteTodo(todo.id)} size="xs" compact>
                    Delete
                </Button>
            )}
        </Group>
    );
}

export default function TodoList() {
    const { data, isLoading } = useGetTodosQuery();

    if (isLoading) return <Loader />;

    return (
        <Stack id="todo-list">
            {data.map((todo) => (
                <Todo key={todo.id} todo={todo} />
            ))}
            <TodoForm />
        </Stack>
    );
}
