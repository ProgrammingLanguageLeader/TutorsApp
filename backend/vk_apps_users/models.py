from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class VkAppsUser(models.Model):
    vk_id = models.IntegerField(
        unique=True,
        null=False,
        blank=False,
        primary_key=True,
        verbose_name=_('VK ID')
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name=_('user')
    )

    class Meta:
        verbose_name = _('VK Apps User')
        verbose_name_plural = _('VK Apps Users')

    def __str__(self):
        return str(self.user)
