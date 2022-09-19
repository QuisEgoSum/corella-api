import typing
from datetime import datetime

from gino import Gino
from sqlalchemy import Column, Integer, Boolean, Numeric, String, Text

from src.core.config import config


class TypedGino(Gino):
    Column: typing.Type[Column]
    Integer: typing.Type[Integer]
    Boolean: typing.Type[Boolean]
    Numeric: typing.Type[Numeric]
    String: typing.Type[String]
    Text: typing.Type[Text]


db: TypedGino = TypedGino()


class DefaultModel(db.Model):
    id = db.Column(db.Integer(), primary_key=True)


class TimestampedModel(DefaultModel):
    created_at = db.Column(db.Integer(), nullable=False, default=lambda: int(datetime.now().timestamp()))
    updated_at = db.Column(db.Integer(), nullable=False, default=lambda: int(datetime.now().timestamp()))


async def connect():
    await db.set_bind(config.database.uri)
