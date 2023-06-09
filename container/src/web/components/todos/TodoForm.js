import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, TextInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import { client } from "@/util.js";

import { usePostTodoMutation } from "@/services/todos.js";

export default function TodoForm() {
    const [postTodo] = usePostTodoMutation();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        postTodo(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput {...register("text")} />
                <Button type="submit">Add Todo</Button>
            </Stack>
        </form>
    );
}
