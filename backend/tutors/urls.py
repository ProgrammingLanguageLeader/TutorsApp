from django.urls import path

from tutors.views import StudentsView, DeleteStudentView

urlpatterns = [
    path('students/', StudentsView.as_view()),
    path('delete_student/', DeleteStudentView.as_view()),
]
