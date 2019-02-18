from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.conf import settings


class Notification(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        related_name='notification_sender',
        on_delete=models.CASCADE
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='notification_recipient',
        on_delete=models.CASCADE
    )
    verb = models.CharField(max_length=32)

    target_content_type = models.ForeignKey(
        ContentType,
        related_name='notification_target_content_type',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    target_object_id = models.PositiveIntegerField(
        null=True,
        blank=True
    )
    target = GenericForeignKey('target_content_type', 'target_object_id')

    unread = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ('-id', )
