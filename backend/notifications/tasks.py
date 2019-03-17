from datetime import timedelta

from django.db.models import Q, F
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from backend_project.celery import app

from notifications.models import Notification

from vk_apps_users.vk_api import API

from lessons.models import Lesson


@app.task
def send_vk_notification(user_ids):
    api = API()
    api.notifications.sendMessage(
        user_ids=user_ids,
        message=str(_('You have unread notifications')),
        fragment='notifications'
    )


@app.task
def send_payment_notifications():
    now_datetime = timezone.now()
    hour_ago_datetime = now_datetime - timedelta(hours=1)
    lessons = Lesson.objects.filter(
        Q(ending_time__gte=hour_ago_datetime)
        & Q(ending_time__lte=now_datetime)
    )
    for lesson in lessons:
        Notification.objects.create(
            recipient=lesson.student,
            verb='lesson payment',
            target=lesson
        )
