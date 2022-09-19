import os
import sys

import yaml
from dacite import from_dict


from src.core.config import Сonfig
from src.core.config.ConfigSchema import ConfigSchema
from src.core.config.env import create_env_list_from_schema, assign_env_to_dict
from src.core.config.project import project_name, root_dir, project_metadata
from src.core.config.Сonfig import Config
from src.lib.alg import merge_dict_priority


DEFAULT_CONFIG_PATH = os.path.join(root_dir, 'config/default.yaml')

default_config_values = dict(
    paths=dict(root=root_dir),
    logger=dict(destination=root_dir + '/logs'),
    project=project_metadata
)


def _get_override_config_path() -> str or None:
    actual_config_path = os.environ.get(
        f'{project_name}_CONFIG',
        None
    )
    if actual_config_path is None:
        for index, arg in enumerate(sys.argv):
            if arg.startswith('--config'):
                if arg.startswith('--config='):
                    actual_config_path = arg.replace('--config=', '')
                else:
                    actual_config_path = sys.argv[index + 1]
                break
        if actual_config_path is not None and actual_config_path.startswith('./'):
            actual_config_path = os.path.abspath(os.path.join(root_dir, actual_config_path))
    return actual_config_path


def _finalize_config(config_dict: dict):
    assign_env_to_dict(config_dict)
    config_dict = ConfigSchema(**config_dict).dict()
    config_dict = merge_dict_priority(default_config_values, config_dict, False)
    return from_dict(data_class=Config, data=config_dict)


def load_config() -> Config:
    # mapper = DictDataclsMapper(Config)
    override_config_path = _get_override_config_path()

    with open(DEFAULT_CONFIG_PATH) as stream:
        default_config_dict = yaml.safe_load(stream) or dict()

    if override_config_path is None:
        return _finalize_config(default_config_dict)

    with open(override_config_path) as stream:
        actual_config_dict = yaml.safe_load(stream) or dict()

    merge_config_dict = merge_dict_priority(default_config_dict, actual_config_dict)
    return _finalize_config(merge_config_dict)


config: Config = load_config()

