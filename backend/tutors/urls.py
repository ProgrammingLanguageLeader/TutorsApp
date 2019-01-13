from django.urls import path, include

from rest_framework.routers import DefaultRouter

from tutors.views import StudentsViewSet, StudentRequestsViewSet

router = DefaultRouter()
router.register(r'student_requests', StudentRequestsViewSet)
router.register(r'students', StudentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
