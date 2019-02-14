from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.dispatch import receiver

from lessons.models import Lesson

from notifications.models import Notification


@receiver(models.signals.post_save, sender=Lesson)
def send_notification_on_lesson_creation(
    sender,
    instance,
    created,
    **kwargs
):
    if not created:
        return
    Notification.objects.create(
        sender=instance.tutor,
        recipient=instance.student,
        target=instance,
        verb='create'
    )


@receiver(models.signals.pre_delete, sender=Lesson)
def delete_old_notification_and_create_new_on_lesson_deletion(
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
    Notification.objects.create(
        sender=instance.tutor,
        recipient=instance.student,
        verb='delete'
    )
