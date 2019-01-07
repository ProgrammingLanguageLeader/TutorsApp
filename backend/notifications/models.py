from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.conf import settings


class Notification(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='notification_sender',
        on_delete=models.CASCADE
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='notification_recipient',
        on_delete=models.CASCADE
    )
    verb = models.CharField(max_length=255)

    target_content_type = models.ForeignKey(
        ContentType,
        related_name='notification_target_content_type',
        on_delete=models.CASCADE
    )
    target_object_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_content_type', 'target_object_id')

    unread = models.BooleanField(default=False)

    def __str__(self):
        return 'sender: {} | recipient: {} | unread: {}'.format(
            self.sender,
            self.recipient,
            self.unread
        ).capitalize()
