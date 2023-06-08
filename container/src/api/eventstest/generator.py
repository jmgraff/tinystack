import asyncio
from django_eventstream import send_event

class Generator:
    def __init__(self):
        self.value = 0
        self.task = None

    async def start(self):
        if self.task is None:
            self.task = asyncio.create_task(self.run_generator())

    def stop(self):
        if self.task is not None:
            self.task.cancel()
            self.task = None
            self.value = 0

    async def run_generator(self):
        while True:
            await asyncio.sleep(1)
            self.value += 1
            send_event("test", "message", {"value": self.value})


generator = Generator()
