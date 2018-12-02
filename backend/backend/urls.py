from django.urls import path, include
from rest_framework.schemas import get_schema_view

from backend.views.profile_views import CreateProfileView
from backend.views.profile_views import UpdateProfileView
from backend.views.profile_views import GetProfileView
from backend.views.profile_views import DeactivateProfileView

from backend.views.vacancy_views import CreateVacancyView
from backend.views.vacancy_views import UpdateVacancyView
from backend.views.vacancy_views import SearchVacanciesView
from backend.views.vacancy_views import GetVacancyView
from backend.views.vacancy_views import GetProfileVacanciesView
from backend.views.vacancy_views import DeactivateVacancyView
from backend.views.vacancy_views import DeleteVacancyView

from backend.views.students_views import GetStudentsView
from backend.views.students_views import DeleteStudentView

from backend.views.lesson_views import CreateLessonView
from backend.views.lesson_views import GetLessonsView
from backend.views.lesson_views import UpdateLessonView
from backend.views.lesson_views import DeleteLessonView

from backend.views.application_views import AddApplicationView
from backend.views.application_views import GetApplicationsView
from backend.views.application_views import AcceptApplicationView
from backend.views.application_views import DeleteApplicationView


profile_urlpatterns = [
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
        'deactivate_profile/',
        DeactivateProfileView.as_view(),
        name='delete_profile'
    ),
]

vacancy_urlpatterns = [
    path(
        'create_vacancy/',
        CreateVacancyView.as_view(),
        name='create_vacancy'
    ),
    path(
        'update_vacancy/',
        UpdateVacancyView.as_view(),
        name='update_vacancy'
    ),
    path(
        'search_vacancies/',
        SearchVacanciesView.as_view(),
        name='search_vacancies'
    ),
    path(
        'get_vacancy/',
        GetVacancyView.as_view(),
        name='get_vacancy'
    ),
    path(
        'get_profile_vacancies/',
        GetProfileVacanciesView.as_view(),
        name='get_profile_vacancies'
    ),
    path(
        'deactivate_vacancy/',
        DeactivateVacancyView.as_view(),
        name='deactivate_vacancy'
    ),
    path(
        'delete_vacancy/',
        DeleteVacancyView.as_view(),
        name='delete_vacancy'
    ),
]

students_urlpatterns = [
    path(
        'get_students/',
        GetStudentsView.as_view(),
        name='get_students'
    ),
    path(
        'delete_student/',
        DeleteStudentView.as_view(),
        name='delete_student'
    ),
]

lesson_urlpatterns = [
    path(
        'create_lesson/',
        CreateLessonView.as_view(),
        name='add_lesson'
    ),
    path(
        'get_lessons/',
        GetLessonsView.as_view(),
        name='get_lessons'
    ),
    path(
        'update_lesson/',
        UpdateLessonView.as_view(),
        name='update_lesson'
    ),
    path(
        'delete_lesson/',
        DeleteLessonView.as_view(),
        name='delete_lesson'
    ),
]

application_urlpatterns = [
    path(
        'add_application/',
        AddApplicationView.as_view(),
        name='add_application'
    ),
    path(
        'get_applications/',
        GetApplicationsView.as_view(),
        name='get_applications'
    ),
    path(
        'accept_application/',
        AcceptApplicationView.as_view(),
        name='accept_application'
    ),
    path(
        'delete_application/',
        DeleteApplicationView.as_view(),
        name='delete_application'
    ),
]

urlpatterns = [
    path(
        '',
        get_schema_view()
    ),
    path('', include(profile_urlpatterns)),
    path('', include(vacancy_urlpatterns)),
    path('', include(students_urlpatterns)),
    path('', include(lesson_urlpatterns)),
    path('', include(application_urlpatterns)),
]
