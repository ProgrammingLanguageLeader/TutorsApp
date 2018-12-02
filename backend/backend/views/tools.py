from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN

from backend.auth import is_authenticated


def check_authentication(method):
    def wrapper(view_instance, request):
        if not is_authenticated(request):
            return Response(
                data="user id or signed user id are not valid",
                status=HTTP_403_FORBIDDEN
            )
        return method(view_instance, request)
    return wrapper


def get_error_message_response(*args):
    variable_names = args
    return Response(
        data=[{
            variable_name: [
                "{} is not valid".format(variable_name)
            ] for variable_name in variable_names
        }],
        status=HTTP_400_BAD_REQUEST
    )
