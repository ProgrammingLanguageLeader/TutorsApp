from datetime import timedelta

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

from lessons.validators import validate_beginning_time


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

    price = models.IntegerField(
        validators=[
            MinValueValidator(limit_value=1),
            MaxValueValidator(limit_value=10000),
        ]
    )

    beginning_time = models.DateTimeField(
        validators=[validate_beginning_time, ]
    )

    duration = models.DurationField(
        validators=[
            MinValueValidator(limit_value=timedelta(minutes=30)),
            MaxValueValidator(limit_value=timedelta(hours=4)),
        ]
    )

    ending_time = models.DateTimeField(editable=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(editable=False)

    class Meta:
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'
        ordering = ('-id', )

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self.modification_time = timezone.now()
        self.ending_time = self.beginning_time + self.duration
        super().save(force_insert, force_update, using, update_fields)
