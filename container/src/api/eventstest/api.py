from ninja import Router

from eventstest.generator import generator
from eventstest.schema import GeneratorSchema

router = Router()


@router.get("", response=GeneratorSchema)
def get_generator(request):
    return GeneratorSchema(value=generator.value)


@router.post("/start/")
async def start_generator(request):
    await generator.start()


@router.post("/stop/")
def stop_generator(request):
    generator.stop()
