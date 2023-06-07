import os

import uvicorn

if __name__ == "__main__":
    is_dev = os.getenv("DEV") == "1"
    log_level = "debug" if is_dev else "info"

    uvicorn.run("api.asgi:application", host="0.0.0.0", port=8080, log_level=log_level, reload=is_dev)
