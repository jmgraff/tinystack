import { CircularProgress, Button, TextField, Box, Alert, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { client } from "../util";

export default function AuthPage() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(["user"], () => client.get("/users/me").then(res => res.data || null));
    const { register, handleSubmit, reset, setError, formState: {errors} } = useForm();
    const login = useMutation(
        (data) => client.post("/auth/jwt/login", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            if (res.request.status === 400) {
                setError("badCreds", { message: "Invalid username or password" });
                throw res.request.status;
            }
        }),
        {
            onSuccess: () => {
                reset();
                queryClient.invalidateQueries(["user"]);
            },
        }
    );
    const onSubmit = (data) => {
        login.mutate(data);
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Box >
            {!data && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem"
                    }}>
                        <Typography>Log In</Typography>
                        { errors.badCreds && <Alert severity="error">{errors.badCreds.message}</Alert> }
                        <Box><TextField label="User Name" {...register("username")} /></Box>
                        <Box><TextField label="Password" type="password" {...register("password")} /></Box>
                        </Box>
                    <input type="hidden" value="" {...register("grant_type")} />
                    <input type="hidden" value="" {...register("scope")} />
                    <input type="hidden" value="" {...register("client_id")} />
                    <input type="hidden" value="" {...register("client_secret")} />
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-end"
                    }}>
                        <Button type="submit">Log In</Button>
                    </Box>
                </form>
            )}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Box>
    );
}
