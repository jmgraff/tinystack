from ninja import Router

from eventstest.generator import generator

router = Router()


@router.post("/start/")
async def start_generator(request):
    await generator.start()


@router.post("/stop/")
def stop_generator(request):
    generator.stop()
