from django.contrib import admin

from notifications.models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        'sender',
        'recipient',
        'creation_time',
        'verb',
        'unread',
    )
    list_filter = (
        'sender',
        'recipient',
        'unread',
        'verb',
    )
    search_fields = (
        'verb',
    )
