from asgiref.sync import async_to_sync

from ninja import Router

from eventstest.generator import generator
from eventstest.schema import GeneratorSchema

router = Router()


@router.get("", response=GeneratorSchema)
def get_generator(request):
    return GeneratorSchema(value=generator.value)


@router.post("/start/")
def start_generator(request):
    async_to_sync(generator.start)()


@router.post("/stop/")
def stop_generator(request):
    async_to_sync(generator.stop)()
