from django.contrib import admin

from .models import (
    Profile,
    Report,
    Lesson,
    Vacancy,
    Application
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Lesson)
admin.site.register(Vacancy)
admin.site.register(Application)
