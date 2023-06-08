import { useState, useEffect } from "react";

function useGenerator() {
    const [generator, setGenerator] = useState({});
    useEffect(() => {
        const eventSource = new EventSource("/api/events/");
        eventSource.onmessage = (msg) => {
            console.log(msg);
            setGenerator(JSON.parse(msg.data));
        };
        return () => eventSource.close();
    }, []);
    return generator;
}

export default function EventsTest() {
    const generator = useGenerator();

    return (
        <pre>{JSON.stringify(generator, null, 2)}</pre>
    );
}
