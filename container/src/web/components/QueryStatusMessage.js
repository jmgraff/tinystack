import { Alert } from "@mantine/core";

export default function QueryStatusMessage({ query, successTitle, errorTitle }) {
    if (query.isError) {
        console.log(query);
        const detail = query.error.data;
        let messages = [];

        if (typeof detail === "string") {
            messages.push(detail);
        } else if (Array.isArray(detail)) {
            detail.forEach((item) => messages.push(item.msg));
        }

        return (
            <Alert title={errorTitle || "Error"} color="red">
                <ul>
                    {messages.map((message, ii) => (
                        <li key={ii}>{message}</li>
                    ))}
                </ul>
            </Alert>
        );
    } else if (query.isSuccess) {
        return <Alert color="green">{successTitle || "Success"}</Alert>;
    }
}
