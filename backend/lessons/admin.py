from django.contrib import admin

from lessons.models import Lesson, LessonAdmin

admin.site.register(Lesson, LessonAdmin)
