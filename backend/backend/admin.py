from django.contrib import admin

from backend.models import (
    Profile, Report, Lesson, Vacancy, StudentApplication, Students, Notification,
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Lesson)
admin.site.register(Vacancy)
admin.site.register(StudentApplication)
admin.site.register(Students)
admin.site.register(Notification)
