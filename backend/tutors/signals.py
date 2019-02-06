from django.db import models
from django.dispatch import receiver

from tutors.models import StudentRequest

from notifications.models import Notification


@receiver(models.signals.post_save, sender=StudentRequest)
def send_notification_on_student_request_creation(
    sender,
    instance,
    created,
    **kwargs
):
    if not created:
        return
    Notification.objects.create(
        sender=instance.student,
        recipient=instance.tutor,
        target=instance,
        verb='create'
    )
