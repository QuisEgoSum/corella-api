import typing

from src.core.exception import BadRequestException, ApplicationException
from src.core.validator.enums import TargetNameEnum


class SchemaValidationException(BadRequestException):
    class SchemaValidationItemException(ApplicationException):
        message: str
        code: int = 2
        location: typing.Tuple[str or int]

        def __init__(self, message: str, location: typing.Tuple[str or int]):
            super().__init__(message)
            self.location = location

        def asdict(self):
            return dict(**super().asdict(), location=self.location)

    target: str
    code: int = 1
    message = 'Validation errors'
    errors: typing.List[SchemaValidationItemException]

    def __init__(self, target: TargetNameEnum, errors):
        super().__init__(self.message)
        self.errors = errors
        self.target = target.value

    def asdict(self):
        return dict(
            **super().asdict(),
            target=self.target,
            errors=[error.asdict() for error in self.errors]
        )


class NotRequestProvidedException(BadRequestException):
    code = 3
    target: str

    def __init__(self, target: TargetNameEnum):
        super().__init__(f'No request {target.name} provided')
        self.target = target.value

    def asdict(self):
        return dict(
            **super().asdict(),
            target=self.target
        )

