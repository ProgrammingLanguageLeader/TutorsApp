from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

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

    def full_name(self, instance):
        return instance.get_full_name()

    full_name.short_description = _('full name')
