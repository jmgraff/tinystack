import asyncio

from eventstest.consumers import GeneratorConsumer


class Generator:
    def __init__(self):
        self.value = 0
        self.task = None

    async def start(self):
        if self.task is None:
            self.task = asyncio.create_task(self.run_generator())

    async def stop(self):
        if self.task is not None:
            self.task.cancel()
            self.task = None
            self.value = 0
            await self.send_value()

    async def run_generator(self):
        while True:
            self.value += 1
            await self.send_value()
            await asyncio.sleep(1)

    async def send_value(self):
        await GeneratorConsumer.send_generator_value(self.value)


generator = Generator()
