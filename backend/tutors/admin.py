from django.contrib import admin

from tutors.models import Tutor, TutorAdmin, \
    StudentRequest, StudentRequestAdmin

admin.site.register(Tutor, TutorAdmin)
admin.site.register(StudentRequest, StudentRequestAdmin)
