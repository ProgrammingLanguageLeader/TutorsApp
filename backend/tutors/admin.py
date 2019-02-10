from django.contrib import admin

from tutors.models import TutorStudents, StudentRequest


@admin.register(TutorStudents)
class TutorStudentsAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'students_count',
    )


@admin.register(StudentRequest)
class StudentRequestAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'tutor',
        'creation_time',
    )
