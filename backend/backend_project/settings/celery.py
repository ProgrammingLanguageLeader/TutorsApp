from decouple import config


REDIS_HOST = config('REDIS_HOST')
REDIS_PORT = config('REDIS_PORT')

CELERY_BROKER_URL = 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT)
CELERY_RESULT_BACKEND = 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT)
CELERY_ACCEPT_CONTENT = ('application/json', )
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'

BROKER_TRANSPORT_OPTIONS = {
    'visibility_timeout': 3600
}
