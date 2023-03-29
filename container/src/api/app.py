import os
import typing

from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from db import get_async_session, create_db_and_tables, Todo

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("PROTO") + "://" + os.getenv("WEB_HOST")],
    allow_methods=["*"],
)


class TodoModel(BaseModel):
    id: typing.Optional[int]
    text: str
    done: bool


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()


@app.get("/todos")
async def get_todos(session: AsyncSession = Depends(get_async_session)):
    todos = await session.execute(select(Todo))
    return [{"id": todo.id, "text": todo.text, "done": todo.done} for todo in todos.scalars()]


@app.get("/todo/{id}")
async def get_todo(id: int, session: AsyncSession = Depends(get_async_session)):
    todo = await session.get(Todo, id)
    return {"id": todo.id, "text": todo.text}


@app.post("/todos")
async def post_todo(todo: TodoModel, session: AsyncSession = Depends(get_async_session)):
    session.add(Todo(text=todo.text, done=todo.done))
    await session.commit()


@app.delete("/todos/{id}")
async def delete_todo(id: int, session: AsyncSession = Depends(get_async_session)):
    todo = await session.get(Todo, id)
    await session.delete(todo)
    await session.commit()


@app.put("/todo/{id}")
async def put_todo(id: int, new_todo: TodoModel, session: AsyncSession = Depends(get_async_session)):
    todo = await session.get(Todo, id)
    todo.text = new_todo.text
    todo.done = new_todo.done
    await session.commit()
