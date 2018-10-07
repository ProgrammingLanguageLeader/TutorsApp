import base64
import hashlib
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import authentication
from rest_framework import exceptions


class VKAppsAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        signed_user_id = request.data.get('signed_user_id')
        vk_id = request.data.get('vk_id')
        vk_app_secret = settings.VK_APP_SECRET
        vk_app_id = settings.VK_APP_ID

        encoded_string = (
                str(vk_app_id) +
                vk_app_secret +
                str(vk_id) +
                ')'
        ).encode('utf-8')
        digest = hashlib.sha256(encoded_string).digest()
        real_signature = base64.b64encode(digest)
        real_signature = real_signature.replace(b'+', b'-')
        real_signature = real_signature.replace(b'/', b'_')
        real_signature = real_signature.rstrip(b'=')

        if real_signature != signed_user_id:
            return None
        try:
            user = User.objects.get(vk_id=vk_id)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No such user')
        return user, None
