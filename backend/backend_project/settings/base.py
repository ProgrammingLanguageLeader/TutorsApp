import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = bool(os.environ.get('DEBUG'))

SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    SECRET_KEY = 'dj%j-iz3%7$^%#c0ca#4!)^tr1w(n222=@i55uy3t%eafz0f61'
VK_APP_SECRET = os.environ.get('VK_APP_SECRET')
VK_APP_ID = os.environ.get('VK_APP_ID')

ALLOWED_HOSTS = (os.environ.get('ALLOWED_HOSTS') or '').split()
AUTH_USER_MODEL = 'users.User'
CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = 'backend_project.urls'
WSGI_APPLICATION = 'backend_project.wsgi.application'
