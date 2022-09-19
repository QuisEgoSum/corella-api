from dataclasses import dataclass


@dataclass(frozen=True)
class Config:
    @dataclass(frozen=True)
    class Paths:
        root: str

    @dataclass(frozen=True)
    class Server:
        @dataclass(frozen=True)
        class HttpServer:
            host: str
            port: int
            workers: int

        http: HttpServer

    @dataclass(frozen=True)
    class Database:
        user: str
        password: str
        host: str
        port: int
        name: str

        @property
        def uri(self):
            return f'postgresql://{self.user}:{self.password}@{self.host}:{self.port}/{self.name}'

    @dataclass(frozen=True)
    class Logger:
        destination: str

    @dataclass(frozen=True)
    class Project:
        name: str
        version: str

    debug: bool
    paths: Paths
    server: Server
    database: Database
    logger: Logger
    project: Project
