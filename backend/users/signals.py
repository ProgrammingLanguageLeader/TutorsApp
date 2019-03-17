import os

from django.db import models
from django.dispatch import receiver

from users.models import User
from users.tools import compress_avatar


@receiver(models.signals.pre_delete, sender=User)
def delete_avatar(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding User object will be deleted.
    """
    if instance.avatar:
        if os.path.isfile(instance.avatar.path):
            os.remove(instance.avatar.path)


@receiver(models.signals.pre_save, sender=User)
def handle_avatar_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding User object is updated
    with new file and compress the last one.
    """
    if not instance.pk:
        return
    try:
        old_avatar = sender.objects.get(pk=instance.pk).avatar
    except sender.DoesNotExist:
        return

    new_avatar = instance.avatar
    if old_avatar and old_avatar != new_avatar:
        if os.path.isfile(old_avatar.path):
            os.remove(old_avatar.path)

    if new_avatar:
        instance.avatar = compress_avatar(new_avatar)
        if os.path.isfile(new_avatar.path):
            os.remove(new_avatar.path)
