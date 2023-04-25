import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, TextInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import { client } from "@/util.js";

export default function TodoForm() {
    const queryClient = useQueryClient();
    const onSubmit = (data) => mutation.mutate(data);
    const { register, handleSubmit, reset } = useForm();
    const mutation = useMutation((data) => client.post("todos", { ...data, done: false }), {
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries(["todos"]);
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput {...register("text")} />
                <Button type="submit">Add Todo</Button>
            </Stack>
        </form>
    );
}
