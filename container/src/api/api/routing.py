from django.urls import path
from eventstest.consumers import GeneratorConsumer

websocket_urlpatterns = [
    path("api/eventstest/", GeneratorConsumer.as_asgi()),
]
