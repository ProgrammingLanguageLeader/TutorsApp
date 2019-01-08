from django.db import models
from django.conf import settings
from django.contrib import admin


class Tutor(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='students_tutor',
        primary_key=True
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True
    )

    def students_count(self):
        return self.students.count()

    students_count.short_description = 'Students count'

    def __str__(self):
        return str(self.user)


class TutorAdmin(admin.ModelAdmin):
    list_display = ('user', 'students_count', )
