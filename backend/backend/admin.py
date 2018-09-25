from django.contrib import admin

from .models import (
    Profile,
    Report,
    Schedule,
    Vacancy
)

admin.site.register(Profile)
admin.site.register(Report)
admin.site.register(Schedule)
admin.site.register(Vacancy)
