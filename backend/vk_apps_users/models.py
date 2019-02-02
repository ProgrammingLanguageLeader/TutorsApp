from django.db import models
from django.conf import settings


class VkAppsUser(models.Model):
    vk_id = models.IntegerField(
        unique=True,
        null=False,
        blank=False,
        primary_key=True
    )
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "{} | {}".format(
            self.user,
            self.vk_id
        )
