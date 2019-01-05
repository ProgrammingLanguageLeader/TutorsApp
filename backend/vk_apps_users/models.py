from django.db import models
from django.conf import settings


class VkAppsUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True
    )
    vk_id = models.IntegerField(unique=True, null=False, blank=False)

    def __str__(self):
        return "{} | {}".format(
            self.user,
            self.vk_id
        )
