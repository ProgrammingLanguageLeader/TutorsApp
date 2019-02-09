from django.contrib import admin

from vacancies.models import Vacancy


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = (
        'owner',
        'subject',
        'price',
        'is_active',
    )
    list_filter = (
        'owner',
        'subject',
        'price',
    )
