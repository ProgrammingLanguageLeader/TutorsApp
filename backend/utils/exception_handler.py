from rest_framework.views import exception_handler

from vacancies.exceptions import LimitExceeded


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and isinstance(exc, LimitExceeded):
        response.data['detail'] = 'vacations limit exceeded'

    return response
