from django.contrib.contenttypes.models import ContentType
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


@receiver(models.signals.pre_delete, sender=StudentRequest)
def delete_notification_on_student_request_deletion(
    sender,
    instance,
    **kwargs
):
    notifications = Notification.objects.filter(
        target_object_id=instance.id,
        target_content_type=ContentType.objects.get_for_model(instance)
    )
    for notification in notifications:
        notification.delete()
