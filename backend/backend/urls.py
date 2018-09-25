from django.urls import path, include, re_path
from rest_framework.schemas import get_schema_view


from .views import (
    CreateProfileView,
    UpdateProfileView,
    GetProfileView,
    CreateVacancyView,
    SearchVacancyView,
    GetActiveVacanciesView,
    GetStudentsView,
    AddScheduleView,
    DeleteScheduleView,
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
        'update_profile',
        UpdateProfileView.as_view(),
        name='update_profile'
    ),
    path(
        'get_profile',
        GetProfileView.as_view(),
        name='get_profile'
    ),
    path(
        'create_vacancy/',
        CreateVacancyView.as_view(),
        name='create_vacancy'
    ),
    path(
        'search_vacancies',
        SearchVacancyView.as_view(),
        name='search_vacancies'
    ),
    path(
        'get_active_vacancies',
        GetActiveVacanciesView.as_view(),
        name='get_active_vacancy'
    ),
    path(
        'get_students',
        GetStudentsView.as_view(),
        name='get_students'
    ),
    path(
        'add_schedule',
        AddScheduleView.as_view(),
        name='add_schedule'
    ),
    path(
        'delete_schedule',
        DeleteScheduleView.as_view(),
        name='delete_schedule'
    ),
    path(
        'delete_vacancy',
        DeleteVacancyView.as_view(),
        name='delete_vacancy'
    ),
    path(
        'delete_profile',
        DeleteProfileView.as_view(),
        name='delete_profile'
    ),
]
