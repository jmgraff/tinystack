import { useForm } from "react-hook-form";

import { Box, Title, TextInput, PasswordInput, Button, Stack } from "@mantine/core";

import { useChangeMyPassword } from "@/util";
import QueryStatusMessage from "@/components/QueryStatusMessage";

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
            <Title order={2}>Change Your Password</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <QueryStatusMessage
                        query={changeMyPassword}
                        errorTitle="Error changing password"
                        successTitle="Password successfully changed"
                    />
                    <PasswordInput
                        label="New Password"
                        data-testid="newPassword"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Required",
                        })}
                    />
                    <PasswordInput
                        label="Confirm New Password"
                        data-testid="confirmNewPassword"
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                            required: "Required",
                            validate: (val) => watch("password") === val || "Passwords don't match",
                        })}
                    />
                    <Button type="submit" data-testid="submitNewPassword">
                        Change Your Password
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
