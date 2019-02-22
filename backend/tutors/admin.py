from django.utils.translation import ugettext_lazy as _
from django.contrib import admin

from tutors.models import TutorStudents, StudentRequest


@admin.register(TutorStudents)
class TutorStudentsAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'students_count',
    )

    def students_count(self, instance):
        return instance.count_students()

    students_count.short_description = _('students count')


@admin.register(StudentRequest)
class StudentRequestAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'tutor',
        'creation_time',
    )
