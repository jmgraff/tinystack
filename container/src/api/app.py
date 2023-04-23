import os
import typing

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from db import get_async_session, create_db_and_tables, User, Todo
from users import auth_backend, current_active_user, fastapi_users, UserCreate, UserRead, UserUpdate, add_superuser

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("PROTO") + "://" + os.getenv("HOST")],
    allow_methods=["*"],
    allow_credentials=True,
)
app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@app.get("/users")
async def get_users(session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)):
    if not user.is_superuser:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    users = await session.execute(select(User))
    return [
        {
            "id": user.id,
            "email": user.email,
            "is_active": user.is_active,
            "is_superuser": user.is_superuser,
        }
        for user in users.scalars()
    ]


# define app routes / models here


class TodoModel(BaseModel):
    id: typing.Optional[int]
    text: str
    done: typing.Optional[bool]


@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()
    await add_superuser()


@app.get("/todos")
async def get_todos(session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)):
    todos = await session.execute(select(Todo))
    return [{"id": todo.id, "text": todo.text, "done": todo.done} for todo in todos.scalars()]


@app.get("/todos/{id}")
async def get_todo(
    id: int, session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)
):
    todo = await session.get(Todo, id)
    return {"id": todo.id, "text": todo.text}


@app.post("/todos")
async def post_todo(
    todo: TodoModel, session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)
):
    session.add(Todo(text=todo.text))
    await session.commit()


@app.delete("/todos/{id}")
async def delete_todo(
    id: int, session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)
):
    todo = await session.get(Todo, id)
    await session.delete(todo)
    await session.commit()


@app.put("/todos/{id}")
async def put_todo(
    id: int,
    new_todo: TodoModel,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    todo = await session.get(Todo, id)
    todo.text = new_todo.text
    todo.done = new_todo.done
    await session.commit()
