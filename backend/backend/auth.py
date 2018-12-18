from collections import OrderedDict

import base64
import hashlib
import hmac
from django.conf import settings


def is_authenticated(request):
    vk_app_secret = settings.VK_APP_SECRET

    sorted_vk_execution_params = OrderedDict()
    sign = None
    request_params = request.query_params \
        if request.method == 'GET' \
        else request.data
    for key, value in request_params.items():
        if key == 'sign':
            sign = value
        elif key.startswith('vk_'):
            sorted_vk_execution_params[key] = value
    if not sign:
        return False

    execution_url_params_string = ''
    for key, value in sorted_vk_execution_params.items():
        execution_url_params_string += '{}={}&'.format(key, value)
    execution_url_params_string = execution_url_params_string[:-1]
    digest = hmac.new(
        bytes(vk_app_secret, encoding='utf-8'),
        msg=bytes(execution_url_params_string, encoding='utf-8'),
        digestmod=hashlib.sha256
    ).digest()
    real_signature = base64.b64encode(digest)
    if real_signature != bytes(sign, encoding='utf-8'):
        return False
    return True
