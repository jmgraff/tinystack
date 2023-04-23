import { Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

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
            <h1>Create User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                    }}
                >
                    <QueryStatusMessage
                        query={createUser}
                        errorTitle="Error adding user"
                        successTitle="Successfully added user"
                    />
                    <TextField
                        label="Email"
                        data-testid="newUserEmail"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register("email", {
                            required: "Required",
                        })}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        data-testid="newUserPassword"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        data-testid="newUserConfirmPassword"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Required",
                            validate: (val) => watch("password") === val || "Passwords don't match",
                        })}
                    />
                    <Button type="submit" data-testid="newUserSubmit">Add User</Button>
                </Box>
            </form>
        </Box>
    );
}
