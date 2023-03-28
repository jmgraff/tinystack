from typing import AsyncGenerator
import pathlib

from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import Session, declarative_base

Base = declarative_base()

pathlib.Path("/opt/data").mkdir(exist_ok=True)
engine = create_async_engine("sqlite+aiosqlite:////opt/data/db.sqlite3")
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


# define database classes here
