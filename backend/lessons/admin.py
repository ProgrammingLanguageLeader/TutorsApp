from django.contrib import admin

from lessons.models import Lesson


class LessonAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'tutor',
        'student',
        'price',
        'beginning_time',
        'ending_time',
    )


admin.site.register(Lesson, LessonAdmin)
