from django.contrib import admin

from tutors.models import TutorStudents, TutorStudentsAdmin, \
    StudentRequest, StudentRequestAdmin

admin.site.register(TutorStudents, TutorStudentsAdmin)
admin.site.register(StudentRequest, StudentRequestAdmin)
