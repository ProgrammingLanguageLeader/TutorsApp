from django.contrib import admin

from .models import (
    Profile, Report, Lesson, Vacancy, Application, Students,
    Notification, NotificationEventChoice
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Lesson)
admin.site.register(Vacancy)
admin.site.register(Application)
admin.site.register(Students)
admin.site.register(Notification)
admin.site.register(NotificationEventChoice)
