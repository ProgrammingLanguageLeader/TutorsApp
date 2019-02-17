from django.db import models
from django.dispatch import receiver

from notifications.models import Notification

from vk_apps_users.models import VkAppsUser
from vk_apps_users.vk_api import API


@receiver(models.signals.post_save, sender=Notification)
def send_vk_notification(sender, instance, created, **kwargs):
    if not created:
        return
    user_ids = VkAppsUser.objects.filter(
        user_id=instance.recipient.id
    ).values_list('vk_id', flat=True)
    if not user_ids:
        return
    api = API()
    api.notifications.sendMessage(
        user_ids=user_ids,
        message='You have unread notifications'
    )
