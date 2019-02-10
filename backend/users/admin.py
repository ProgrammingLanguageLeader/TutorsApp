from django.contrib import admin

from users.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'full_name',
        'email',
        'date_joined',
        'city',
        'is_active',
    )
    list_filter = (
        'city',
        'is_active',
    )
    search_fields = (
        'username',
        'email',
    )
