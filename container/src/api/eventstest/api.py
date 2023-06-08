from ninja import Router

from eventstest.generator import generator

router = Router()

@router.post("/start/")
async def start_timer(request):
    await generator.start()

@router.post("/stop/")
def stop_timer(request):
    timer.stop()
