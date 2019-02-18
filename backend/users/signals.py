import os

from django.db import models
from django.dispatch import receiver

from users.models import User


@receiver(models.signals.pre_delete, sender=User)
def auto_delete_avatar_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding User object will be deleted.
    """
    if instance.avatar:
        if os.path.isfile(instance.avatar.path):
            os.remove(instance.avatar.path)


@receiver(models.signals.pre_save, sender=User)
def auto_delete_avatar_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding User object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = sender.objects.get(pk=instance.pk).avatar
    except sender.DoesNotExist:
        return False

    if not old_file:
        return False

    new_file = instance.avatar
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
