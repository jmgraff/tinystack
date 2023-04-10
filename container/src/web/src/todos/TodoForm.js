import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../util";
import { Button, Input } from "@mui/material";

export default function TodoForm() {
    const queryClient = useQueryClient();
    const onSubmit = (data) => mutation.mutate(data);
    const { register, handleSubmit, reset } = useForm();
    const mutation = useMutation((data) => axiosInstance.post("todos", { ...data, done: false }), {
        onSuccess: () => {
            reset();
            queryClient.invalidateQueries(["todos"]);
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" {...register("text")} />
            <Button type="submit">Add Todo</Button>
        </form>
    );
}
