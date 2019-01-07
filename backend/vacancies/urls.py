from django.urls import path, include

from rest_framework.routers import DefaultRouter

from vacancies.views import VacanciesViewSet

router = DefaultRouter()
router.register(r'', VacanciesViewSet)

urlpatterns = [
    path('', include(router.urls))
]
