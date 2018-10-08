import base64
import hashlib
from django.conf import settings


def is_authenticated(request):
    # delete this after VK Apps authorization release
    if settings.ITS_NOT_TIME_YET:
        return True

    signed_user_id = request.data.get('signed_user_id') \
        or request.query_params.get('signed_user_id')
    user_id = request.data.get('user_id') \
        or request.query_params.get('user_id')

    if not user_id or not signed_user_id:
        return False
    vk_app_secret = settings.VK_APP_SECRET
    vk_app_id = settings.VK_APP_ID

    encoded_string = (
            str(vk_app_id) +
            vk_app_secret +
            str(user_id) +
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
