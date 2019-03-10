from django.dispatch import Signal
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.dispatch import receiver

from tutors.models import StudentRequest

from notifications.models import Notification


student_request_answer = Signal(providing_args=['instance', 'accepted'])
student_deletion = Signal(providing_args=['ex_tutor', 'ex_student'])


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
        verb='student request create'
    )


@receiver(student_request_answer)
def delete_old_notifications_and_create_new_one_on_student_request_answer(
        sender,
        instance,
        accepted,
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
        verb='student request %s' % ('accept' if accepted else 'reject')
    )
