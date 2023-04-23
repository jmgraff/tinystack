import { Alert, AlertTitle } from "@mui/material";

export default function QueryStatusMessage({ query, successTitle, errorTitle }) {
    if (query.isError) {
        const detail = query.error.response.data.detail;
        let messages = [];

        if (typeof detail === "string") {
            messages.push(detail);
        } else if (Array.isArray(detail)) {
            detail.forEach((item) => messages.push(item.msg));
        }

        return (
            <Alert severity="error">
                <AlertTitle>{errorTitle || "Error"}</AlertTitle>
                <ul>
                    {messages.map((message, ii) => (
                        <li key={ii}>{message}</li>
                    ))}
                </ul>
            </Alert>
        );
    } else if (query.isSuccess) {
        return <Alert severity="success">{successTitle || "Success"}</Alert>;
    }
}
