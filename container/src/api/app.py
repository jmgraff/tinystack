import os
import typing

from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from db import get_async_session, create_db_and_tables

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("PROTO") + "://" + os.getenv("WEB_HOST")],
    allow_methods=["*"],
)


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()
