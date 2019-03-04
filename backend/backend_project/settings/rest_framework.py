REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'vk_apps_users.authentication.VkAppsAuthBackend',
    ),

    'DEFAULT_VERSIONING_CLASS':
        'rest_framework.versioning.QueryParameterVersioning',
    'DEFAULT_VERSION': '1.0',

    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),

    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.LimitOffsetPagination',

    'PAGE_SIZE': 25,

    'EXCEPTION_HANDLER': 'utils.exception_handler.custom_exception_handler',

    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ),

    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '60/minute'
    }
}
