from src.core.validator import Schema
from pydantic import Field


class ConfigSchema(Schema):
    class ServerSchema(Schema):
        class HttpServerSchema(Schema):
            host: str = Field(default='127.0.0.1', min_length=1)
            port: int = Field(default=8080, ge=1, le=65353)
            workers: int = Field(default=1, ge=1, le=124)

        http: HttpServerSchema

    class DatabaseSchema(Schema):
        user: str = Field(min_length=1)
        password: str = Field(min_length=1)
        host: str = Field(min_length=1)
        port: int = Field(default=8080, ge=1, le=65353)
        name: str = Field(min_length=1)

    class LoggerSchema(Schema):
        destination: str = None

    debug: bool
    server: ServerSchema
    database: DatabaseSchema
    logger: LoggerSchema = dict()
