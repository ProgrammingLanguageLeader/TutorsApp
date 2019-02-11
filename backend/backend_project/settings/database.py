import os

from decouple import config

from backend_project.settings.base import DEBUG, BASE_DIR


if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    POSTGRES_USER = config('POSTGRES_USER')
    POSTGRES_PASSWORD = config('POSTGRES_PASSWORD')
    POSTGRES_DB = config('POSTGRES_DB')
    POSTGRES_HOST = config('POSTGRES_HOST')
    POSTGRES_PORT = config('POSTGRES_PORT')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': POSTGRES_DB,
            'USER': POSTGRES_USER,
            'PASSWORD': POSTGRES_PASSWORD,
            'HOST': POSTGRES_HOST,
            'PORT': POSTGRES_PORT,
        }
    }
