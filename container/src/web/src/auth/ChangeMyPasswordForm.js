import { Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

import { useChangeMyPassword } from "../util";
import QueryStatusMessage from "../QueryStatusMessage";

export default function ChangeYourPasswordForm() {
    const changeMyPassword = useChangeMyPassword();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (formData) => {
        changeMyPassword.mutate(formData.password);
        reset();
    };

    return (
        <Box>
            <h1>Change Your Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                    }}
                >
                    <QueryStatusMessage
                        query={changeMyPassword}
                        errorTitle="Error changing password"
                        successTitle="Password successfully changed"
                    />
                    <TextField
                        label="New Password"
                        id="newPassword"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <TextField
                        label="Confirm New Password"
                        id="confirmNewPassword"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Required",
                            validate: (val) => watch("password") === val || "Passwords don't match",
                        })}
                    />
                    <Button type="submit" id="submitNewPassword">
                        Change Your Password
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
