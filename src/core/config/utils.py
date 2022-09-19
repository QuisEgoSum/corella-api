import re


def unify_name(name: str):
    return re.sub(pattern='[^a-zA-Z0-9]', repl='_', flags=re.DOTALL, string=name.upper())
