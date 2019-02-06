from django.db import models
from django.conf import settings


class TutorStudents(models.Model):
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


class StudentRequest(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_request_student'
    )
    tutor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='student_request_tutor'
    )
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'student: {} | tutor: {}'.format(
            self.student,
            self.tutor,
        ).capitalize()
