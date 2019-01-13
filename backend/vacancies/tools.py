import importlib


def get_class(module_name, class_name):
    module = importlib.import_module(module_name)
    _class = getattr(module, class_name)
    return _class
