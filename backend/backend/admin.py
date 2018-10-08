from django.contrib import admin

from .models import (
    Profile,
    Report,
    Lesson,
    Vacancy
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Lesson)
admin.site.register(Vacancy)
