import { useForm } from "react-hook-form";
import { Title, Button, TextInput, Stack, Box } from "@mantine/core";

import { useLogMeInMutation } from "@/services/users.js";
import QueryStatusMessage from "@/components/QueryStatusMessage.js";

export default function Login() {
    const [login] = useLogMeInMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (creds) => login(creds);

    return (
        <Box
            sx={{
                marginTop: "10%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    sx={{
                        width: "30rem",
                    }}
                >
                    <Title order={1}>🥞 tinystack</Title>
                    <QueryStatusMessage query={login} errorTitle="Error logging in" />
                    <TextInput
                        error={errors.username?.message}
                        {...register("username", {
                            required: "Required",
                        })}
                    />
                    <TextInput
                        type="password"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <Button type="submit">Log In</Button>
                </Stack>
            </form>
        </Box>
    );
}
