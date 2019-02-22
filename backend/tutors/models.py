from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class TutorStudents(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='students_tutor',
        primary_key=True,
        verbose_name=_('user')
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        verbose_name=_('students')
    )

    def count_students(self):
        return self.students.count()

    class Meta:
        verbose_name = _('tutor\'s students')
        verbose_name_plural = _('tutors\' students')

    def __str__(self):
        return str(self.user)


class StudentRequest(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_request_student',
        verbose_name=_('student')
    )
    tutor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_request_tutor',
        verbose_name=_('tutor')
    )
    creation_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('creation time')
    )

    class Meta:
        verbose_name = _('student request')
        verbose_name_plural = _('students requests')
        unique_together = ('student', 'tutor')
