from django.db import models
from django.conf import settings
from django.utils import timezone


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
    ending_time = models.DateTimeField(editable=False)
    duration = models.DurationField()
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
