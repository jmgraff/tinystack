import { Button, TextField, Box, Alert, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAddUser } from "../util";

export default function CreateUserForm() {
    const addUser = useAddUser();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (userInfo) => {
        addUser.mutate(userInfo);
        reset();
    }

    return (
        <Box>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "1rem",
                }}>
                    { addUser.isError && <Alert severity="error">Error adding user</Alert> }
                    <TextField label="Email" {...register("email")} />
                    <TextField label="Password" type="password" {...register("password")} />
                    <Button type="submit">Add User</Button>
                </Box>
            </form>
        </Box>
    );
}
