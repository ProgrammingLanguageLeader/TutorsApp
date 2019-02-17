from django.db import models
from django.dispatch import receiver

from notifications.models import Notification
from notifications.tasks import send_vk_notification

from vk_apps_users.models import VkAppsUser


@receiver(models.signals.post_save, sender=Notification)
def send_vk_notification_on_creation(sender, instance, created, **kwargs):
    if not created:
        return
    user_ids = VkAppsUser.objects.filter(
        user_id=instance.recipient.id
    ).values_list('vk_id', flat=True)
    if not user_ids:
        return
    send_vk_notification.delay(list(user_ids))
