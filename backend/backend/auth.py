import base64
import hashlib
from django.conf import settings

from .models import Profile


def is_authenticated(request):
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

    if real_signature != bytes(signed_user_id, encoding='utf-8'):
        return False
    return True
