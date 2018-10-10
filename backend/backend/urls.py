from django.urls import path
from rest_framework.schemas import get_schema_view


from .views import (
    CreateProfileView,
    UpdateProfileView,
    GetProfileView,
    CreateVacancyView,
    SearchVacanciesView,
    GetStudentsView,
    AddLessonView,
    DeleteLessonView,
    DeleteVacancyView,
    DeleteProfileView,
)


urlpatterns = [
    path(
        '',
        get_schema_view()
    ),
    path(
        'create_profile/',
        CreateProfileView.as_view(),
        name='create_profile'
    ),
    path(
        'update_profile/',
        UpdateProfileView.as_view(),
        name='update_profile'
    ),
    path(
        'get_profile/',
        GetProfileView.as_view(),
        name='get_profile'
    ),
    path(
        'create_vacancy/',
        CreateVacancyView.as_view(),
        name='create_vacancy'
    ),
    path(
        'search_vacancies/',
        SearchVacanciesView.as_view(),
        name='search_vacancies'
    ),
    path(
        'get_students/',
        GetStudentsView.as_view(),
        name='get_students'
    ),
    path(
        'add_lesson/',
        AddLessonView.as_view(),
        name='add_lesson'
    ),
    path(
        'delete_lesson/',
        DeleteLessonView.as_view(),
        name='delete_lesson'
    ),
    path(
        'delete_vacancy/',
        DeleteVacancyView.as_view(),
        name='delete_vacancy'
    ),
    path(
        'delete_profile/',
        DeleteProfileView.as_view(),
        name='delete_profile'
    ),
]
