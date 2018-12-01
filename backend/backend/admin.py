from django.contrib import admin

from backend.models import (
    Profile, Report, Lesson, Vacancy, Application, Students, Notification,
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Lesson)
admin.site.register(Vacancy)
admin.site.register(Application)
admin.site.register(Students)
admin.site.register(Notification)
