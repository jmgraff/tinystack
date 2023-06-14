import { Button, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import { useGetGeneratorQuery, useStartGeneratorMutation, useStopGeneratorMutation } from "@/services/generator.js";

export default function EventsTest() {
    const generator = useGetGeneratorQuery();
    const [start] = useStartGeneratorMutation();
    const [stop] = useStopGeneratorMutation();

    return (
        <>
            <Group>
                <Button onClick={() => start()}>Start Generator</Button>
                <Button onClick={() => stop()}>Stop Generator</Button>
            </Group>
            <pre>{JSON.stringify(generator.data, null, 2)}</pre>
        </>
    );
}
