import os

from decouple import config


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)
DEBUG = config('DEBUG', default=True, cast=bool)
SECRET_KEY = config(
    'SECRET_KEY',
    default='dj%j-iz3%7$^%#c0ca#4!)^tr1w(n222=@i55uy3t%eafz0f61'
)
VK_APP_SECRET = config('VK_APP_SECRET', default='FAKE_KEY')
VK_APP_ID = config('VK_APP_ID', default=0)

SESSION_COOKIE_SECURE = config(
    'SESSION_COOKIE_SECURE',
    default=True,
    cast=bool
)
SESSION_COOKIE_HTTPONLY = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split()
AUTH_USER_MODEL = 'users.User'
AUTH_USER_MODEL_SERIALIZER = 'users.serializers.UserSerializer'
CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'backend_project.urls'
WSGI_APPLICATION = 'backend_project.wsgi.application'

DRF_RECAPTCHA_SECRET_KEY = config('DRF_RECAPTCHA_SECRET_KEY', default='FAKE_KEY')
