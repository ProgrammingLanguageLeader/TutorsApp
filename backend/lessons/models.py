from django.db import models
from django.contrib import admin
from django.conf import settings


class Lesson(models.Model):
    tutor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lesson_tutor'
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lesson_student'
    )

    price = models.IntegerField()
    beginning_time = models.DateTimeField()
    ending_time = models.DateTimeField()

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'tutor: {} | student: {}'.format(
            self.tutor_id,
            self.student_id,
        )


class LessonAdmin(admin.ModelAdmin):
    list_display = (
        'tutor',
        'student',
        'price',
        'beginning_time',
        'ending_time',
    )
