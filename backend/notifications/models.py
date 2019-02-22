from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class Notification(models.Model):
    creation_time = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        related_name='notification_sender',
        on_delete=models.CASCADE,
        verbose_name=_('sender')
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='notification_recipient',
        on_delete=models.CASCADE,
        verbose_name=_('recipient')
    )
    verb = models.CharField(
        max_length=32,
        verbose_name=_('verb')
    )

    target_content_type = models.ForeignKey(
        ContentType,
        related_name='notification_target_content_type',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=_('target content type')
    )
    target_object_id = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name=_('target object id')
    )
    target = GenericForeignKey('target_content_type', 'target_object_id')
    target.short_description = _('target')

    unread = models.BooleanField(
        default=True,
        verbose_name=_('unread')
    )

    class Meta:
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
        ordering = ('-id', )
