from django.contrib import admin

from tutors.models import Tutor, TutorAdmin

admin.site.register(Tutor, TutorAdmin)
