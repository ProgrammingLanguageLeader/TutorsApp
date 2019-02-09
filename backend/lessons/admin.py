from django.contrib import admin

from lessons.models import Lesson


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = (
        'tutor',
        'student',
        'price',
        'duration',
        'beginning_time',
        'ending_time',
        'creation_time',
        'modification_time',
    )
    list_filter = (
        'tutor',
        'student',
        'price',
        'duration',
    )
