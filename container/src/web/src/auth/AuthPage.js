import { Button, TextField, Box, Alert, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { useLogin } from "../util";

export default function AuthPage() {
    const login = useLogin();
    const { register, handleSubmit } = useForm();
    const onSubmit = (creds) => login.mutate(creds);

    return (
        <Box sx={{
            mt: "20%",
            display: "flex",
            justifyContent: "center"
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    width: "40rem",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                }}>
                    <Typography variant="h1">🥞 tinystack</Typography>
                    { login.isError && <Alert severity="error">Incorrect username or password</Alert> }
                    <TextField label="Email" {...register("username")} />
                    <TextField label="Password" type="password" {...register("password")} />
                    <Button type="submit">Log In</Button>
                </Box>
            </form>
        </Box>
    );
}
