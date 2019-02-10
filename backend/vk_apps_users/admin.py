from django.contrib import admin

from vk_apps_users.models import VkAppsUser


@admin.register(VkAppsUser)
class VkAppsUserAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'vk_id',
    )
    list_filter = (
        'user__city',
        'user__is_active',
    )
    search_fields = (
        'user__username',
        'vk_id',
    )
