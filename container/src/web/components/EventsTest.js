import { Button, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { useStartGenerator, useStopGenerator } from "@/util.js";

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
    const start = useStartGenerator();
    const stop = useStopGenerator();

    return (
        <>
            <Group>
                <Button onClick={() => start.mutate()}>Start Generator</Button>
                <Button onClick={() => stop.mutate()}>Stop Generator</Button>
            </Group>
            <pre>{JSON.stringify(generator, null, 2)}</pre>
        </>
    );
}
