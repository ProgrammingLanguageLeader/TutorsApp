from datetime import timedelta

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

from lessons.validators import validate_beginning_time


class Lesson(models.Model):
    tutor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lesson_tutor',
        verbose_name=_('tutor')
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lesson_student',
        verbose_name=_('student')
    )

    price = models.IntegerField(
        validators=[
            MinValueValidator(limit_value=1),
            MaxValueValidator(limit_value=10000),
        ],
        verbose_name=_('price')
    )

    beginning_time = models.DateTimeField(
        validators=[validate_beginning_time, ],
        verbose_name=_('beginning time')
    )

    duration = models.DurationField(
        validators=[
            MinValueValidator(limit_value=timedelta(minutes=30)),
            MaxValueValidator(limit_value=timedelta(hours=4)),
        ],
        verbose_name=_('duration')
    )

    ending_time = models.DateTimeField(
        editable=False,
        verbose_name=_('ending time')
    )
    creation_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('creation time')
    )
    modification_time = models.DateTimeField(
        editable=False,
        verbose_name=_('modification time')
    )

    class Meta:
        verbose_name = _('Lesson')
        verbose_name_plural = _('Lessons')
        ordering = ('-id', )

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self.modification_time = timezone.now()
        self.ending_time = self.beginning_time + self.duration
        super().save(force_insert, force_update, using, update_fields)
