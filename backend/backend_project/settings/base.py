import os


BASE_DIR = os.path.dirname(
    os.path.join(
        os.path.join(
            os.path.join(
                os.path.dirname(
                    os.path.abspath(__file__)
                ),
                os.path.pardir
            ),
            os.path.pardir
        ),
        os.path.pardir
    )
)
DEBUG = bool(os.environ.get('DEBUG'))

SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    SECRET_KEY = 'dj%j-iz3%7$^%#c0ca#4!)^tr1w(n222=@i55uy3t%eafz0f61'
VK_APP_SECRET = os.environ.get('VK_APP_SECRET')
VK_APP_ID = os.environ.get('VK_APP_ID')

ALLOWED_HOSTS = (os.environ.get('ALLOWED_HOSTS') or '').split()
AUTH_USER_MODEL = 'users.User'
AUTH_USER_MODEL_SERIALIZER = 'users.serializers.UserSerializer'
CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'backend_project.urls'
WSGI_APPLICATION = 'backend_project.wsgi.application'

DRF_RECAPTCHA_SECRET_KEY = os.environ.get('DRF_RECAPTCHA_SECRET_KEY')
