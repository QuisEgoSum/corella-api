import os
import typing

import jsonref

from src.core.config import ConfigSchema
from src.core.config.project import project_name
from src.core.config.utils import unify_name
from src.utils import resolve_openapi_spec


def _fill_env_list(schema: dict, result, parts: typing.List[str]):
    if 'allOf' in schema:
        _fill_env_list(schema['allOf'][0], result, parts)
    elif schema['type'] == 'object' or 'object' in schema['type']:
        for name, next_schema in schema['properties'].items():
            current_parts = list(parts)
            current_parts.append(name)
            _fill_env_list(next_schema, result, current_parts)
    else:
        result.append(dict(parts=list(parts), type=schema['type']))


def create_env_list_from_schema():
    result = []
    _fill_env_list(resolve_openapi_spec(ConfigSchema.schema_json()), result, [])
    for env in result:
        name_parts = [unify_name(env_name) for env_name in env['parts']]
        name_parts.insert(0, project_name)
        env['name'] = '_'.join(name_parts)
    return result


def assign_env_to_dict(config: dict):
    env_list = create_env_list_from_schema()
    for env in env_list:
        value = os.environ.get(env['name'], None)
        if value is None:
            continue
        config_dict = config
        for index, key in enumerate(env['parts']):
            if index == len(env['parts']) - 1:
                config_dict[key] = value
            else:
                config_dict = config_dict[key]



