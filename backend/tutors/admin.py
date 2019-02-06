from django.contrib import admin

from tutors.models import TutorStudents, StudentRequest


class TutorStudentsAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'students_count',
    )


class StudentRequestAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'tutor',
        'creation_time',
    )


admin.site.register(TutorStudents, TutorStudentsAdmin)
admin.site.register(StudentRequest, StudentRequestAdmin)
