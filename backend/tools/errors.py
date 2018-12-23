from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST


def get_error_message_response(*args, **kwargs):
    variable_names = args
    status = kwargs.get('status') or HTTP_400_BAD_REQUEST
    return Response(
        data=[{
            variable_name: [
                "{} is not valid".format(variable_name)
            ] for variable_name in variable_names
        }],
        status=status
    )
