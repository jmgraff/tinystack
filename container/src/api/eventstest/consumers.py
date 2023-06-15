import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import get_channel_layer


class GeneratorConsumer(AsyncJsonWebsocketConsumer):
    group_name = "generator_group"

    async def connect(self):
        if not self.scope["user"].is_authenticated:
            await self.close()
        else:
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def generator_value(self, event):
        await self.send(text_data=json.dumps({"value": event["value"]}))

    @staticmethod
    async def send_generator_value(value):
        await get_channel_layer().group_send(GeneratorConsumer.group_name, {"type": "generator.value", "value": value})
