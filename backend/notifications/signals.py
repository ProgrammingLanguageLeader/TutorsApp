from django.db import models
from django.dispatch import receiver

from notifications.models import Notification
from notifications.tasks import send_vk_notification

from vk_apps_users.models import VkAppsUser


@receiver(models.signals.post_save, sender=Notification)
def notification_post_save(sender, instance, created, **kwargs):
    notifications_limit = 100

    if not created:
        return
    redundant_notifications = Notification.objects.filter(
        recipient_id=instance.recipient.id
    ).order_by('-creation_time')[notifications_limit:]
    for notification in redundant_notifications:
        notification.delete()
    user_ids = VkAppsUser.objects.filter(
        user_id=instance.recipient.id
    ).values_list('vk_id', flat=True)
    if not user_ids:
        return
    send_vk_notification.delay(list(user_ids))
