from django.conf import settings

import vk

from utils.singleton import Singleton


class API(vk.API, metaclass=Singleton):
    method_default_args = {
        'v': '5.80'
    }

    def __init__(self):
        session = vk.Session(access_token=settings.VK_APP_ACCESS_TOKEN)
        super().__init__(session, **self.method_default_args)
