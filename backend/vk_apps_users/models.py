from django.db import models
from django.conf import settings


class VkAppsUser(models.Model):
    vk_id = models.IntegerField(
        unique=True,
        null=False,
        blank=False,
        primary_key=True,
        verbose_name='VK ID'
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'VK Apps User'
        verbose_name_plural = 'VK Apps Users'

    def __str__(self):
        return str(self.user)
