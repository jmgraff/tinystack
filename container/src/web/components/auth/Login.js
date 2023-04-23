import { Button, TextField, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import QueryStatusMessage from "@/components/QueryStatusMessage.js";
import { useLogin } from "@/util.js";

export default function Login() {
    const login = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (creds) => login.mutate(creds);

    return (
        <Box
            sx={{
                mt: "20%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        width: "40rem",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                    }}
                >
                    <Typography variant="h1">🥞 tinystack</Typography>
                    <QueryStatusMessage query={login} errorTitle="Error logging in" />
                    <TextField
                        label="Email"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        {...register("username", {
                            required: "Required",
                        })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <Button type="submit">Log In</Button>
                </Box>
            </form>
        </Box>
    );
}
