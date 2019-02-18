import os

from backend_project.settings.base import BASE_DIR


LANGUAGE_CODE = 'ru'
LANGUAGES = (
  ('ru', 'Russian'),
  ('en', 'English'),
)

TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)
