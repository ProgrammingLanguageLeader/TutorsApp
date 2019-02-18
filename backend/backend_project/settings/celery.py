from datetime import timedelta

from decouple import config


REDIS_HOST = config('REDIS_HOST', default='localhost')
REDIS_PORT = config('REDIS_PORT', default=6379)

CELERY_BROKER_URL = 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT)
CELERY_RESULT_BACKEND = 'redis://%s:%s/0' % (REDIS_HOST, REDIS_PORT)
CELERY_ACCEPT_CONTENT = ('application/json', )
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_SERIALIZER = 'json'

BROKER_TRANSPORT_OPTIONS = {
    'visibility_timeout': 3600
}

CELERY_BEAT_SCHEDULE = {
    'send_payment_notifications': {
        'task': 'notifications.tasks.send_payment_notifications',
        'schedule': timedelta(hours=1),
    },
}
