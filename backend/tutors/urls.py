from django.urls import path, include

from rest_framework.routers import DefaultRouter

from tutors.views import StudentsView, DeleteStudentView, \
    StudentRequestsViewSet

router = DefaultRouter()
router.register(r'', StudentRequestsViewSet)

urlpatterns = [
    path('students/', StudentsView.as_view()),
    path('delete_student/', DeleteStudentView.as_view()),
    path('student_requests/', include(router.urls)),
]
