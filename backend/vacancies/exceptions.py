from django.core import exceptions


class LimitExceeded(exceptions.PermissionDenied):
    pass
