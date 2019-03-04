from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.dispatch import receiver
from django.utils import timezone

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
        Notification.objects.filter(
            target_content_type=ContentType.objects.get_for_model(instance),
            target_object_id=instance.id,
            verb='lesson update'
        ).delete()
    Notification.objects.create(
        sender=instance.tutor,
        recipient=instance.student,
        target=instance,
        verb='lesson create' if created else 'lesson update'
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
    notifications.delete()
    if instance.ending_time >= timezone.now():
        Notification.objects.create(
            sender=instance.tutor,
            recipient=instance.student,
            verb='lesson delete'
        )
