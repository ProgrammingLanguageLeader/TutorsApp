from collections import OrderedDict

import base64
import hashlib
import hmac
import urllib

from django.conf import settings
from rest_framework import authentication

from backend.models import Profile


class VkAppsAuthBackend(authentication.BaseAuthentication):
    def authenticate(self, request):
        if not self.check_vk_apps_authentication(request):
            return None
        if request.method == 'GET':
            vk_id = request.query_params.get('vk_user_id')
        else:
            vk_id = request.data.get('vk_user_id')
        user = self.get_user(vk_id)
        return user, None

    @staticmethod
    def check_vk_apps_authentication(request):
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

        execution_url_params_string = urllib.parse.urlencode(
            sorted_vk_execution_params
        )
        digest = hmac.new(
            key=bytes(vk_app_secret, encoding='utf-8'),
            msg=bytes(execution_url_params_string, encoding='utf-8'),
            digestmod=hashlib.sha256
        ).digest()
        real_signature = base64.urlsafe_b64encode(digest) \
            .decode('utf-8') \
            .rstrip('=')
        if real_signature != sign:
            return False
        return True

    @staticmethod
    def get_user(vk_id):
        try:
            user = Profile.objects.get(vk_id=vk_id).user
        except Profile.DoesNotExist:
            return None
        return user
