import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Text, TextInput, Checkbox, Loader, Button, Stack, Box, Group } from "@mantine/core";

import TodoForm from "@/components/todos/TodoForm.js";
import { client } from "@/util.js";

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
        <Group onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <Checkbox checked={todo.done} onClick={toggleDone} />
            {editing && (
                <TextInput
                    size="xs"
                    value={text}
                    placeholder={text}
                    onKeyDown={(event) => event.keyCode === 13 && handleEditOrSave(true)}
                    onChange={(event) => setText(event.target.value)}
                />
            )}
            {!editing && (
                <Text sx={{ textDecoration: todo.done ? "line-through" : "none" }}>
                    {todo.text}
                </Text>
            )}
            {editing && <Button onClick={() => handleEditOrSave(true)} size="xs" compact>Save</Button>}
            {editing && <Button onClick={() => handleEditOrSave(false)} size="xs" compact>Cancel</Button>}
            {!editing && hovering && <Button onClick={() => handleEditOrSave()} size="xs" compact>Edit</Button>}
            {!editing && hovering && <Button onClick={() => deleteTodo.mutate(todo)} size="xs" compact>Delete</Button>}
        </Group>
    );
}

export default function TodoList() {
    const { data, isLoading } = useQuery(["todos"], () => client.get("/todos").then((res) => res.data));

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
