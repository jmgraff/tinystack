import { useForm } from "react-hook-form";

import { Box, Title, TextInput, PasswordInput, Button, Stack } from "@mantine/core";

import { useCreateUser } from "@/util";
import QueryStatusMessage from "@/components/QueryStatusMessage";

export default function CreateUserForm() {
    const createUser = useCreateUser();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ email, password }) => {
        createUser.mutate({ email, password });
        reset();
    };

    return (
        <Box>
            <Title order={2}>Create User</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <QueryStatusMessage
                        query={createUser}
                        errorTitle="Error adding user"
                        successTitle="Successfully added user"
                    />
                    <TextInput
                        label="Email"
                        data-testid="newUserEmail"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email", {
                            required: "Required",
                        })}
                    />
                    <PasswordInput
                        label="Password"
                        data-testid="newUserPassword"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <PasswordInput
                        label="Confirm Password"
                        data-testid="newUserConfirmPassword"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Required",
                            validate: (val) => watch("password") === val || "Passwords don't match",
                        })}
                    />
                    <Button type="submit" data-testid="newUserSubmit">
                        Add User
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
