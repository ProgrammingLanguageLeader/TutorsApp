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

from backend.views.student_application_views import (
    CreateStudentApplicationView,
    GetIncomingStudentApplicationsView,
    GetOutgoingStudentApplicationView,
    AcceptStudentApplicationView,
    RejectStudentApplicationView,
)

from backend.views.lesson_application_views import (
    CreateLessonApplicationView,
    GetIncomingLessonApplicationsView,
    GetOutgoingLessonApplicationView,
    AcceptLessonApplicationView,
    RejectLessonApplicationView,
)

from backend.views.payment_application_views import (
    CreatePaymentApplicationView,
    GetIncomingPaymentApplicationsView,
    GetOutgoingPaymentApplicationView,
    AcceptPaymentApplicationView,
    RejectPaymentApplicationView,
)

from backend.views.notification_views import GetNotificationsView
from backend.views.notification_views import MarkNotificationAsSeenView


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

student_application_urlpatterns = [
    path(
        'create_student_application/',
        CreateStudentApplicationView.as_view(),
        name='create_student_application'
    ),
    path(
        'get_incoming_student_applications/',
        GetIncomingStudentApplicationsView.as_view(),
        name='get_incoming_student_applications'
    ),
    path(
        'get_outgoing_student_applications/',
        GetOutgoingStudentApplicationView.as_view(),
        name='get_outgoing_student_applications'
    ),
    path(
        'accept_student_application/',
        AcceptStudentApplicationView.as_view(),
        name='accept_student_application'
    ),
    path(
        'reject_student_application/',
        RejectStudentApplicationView.as_view(),
        name='reject_student_application'
    ),
]

lesson_application_urlpatterns = [
    path(
        'create_lesson_application/',
        CreateLessonApplicationView.as_view(),
        name='create_lesson_application'
    ),
    path(
        'get_incoming_applications/',
        GetIncomingLessonApplicationsView.as_view(),
        name='get_incoming_lesson_applications'
    ),
    path(
        'get_outgoing_applications/',
        GetOutgoingLessonApplicationView.as_view(),
        name='get_outgoing_lesson_applications'
    ),
    path(
        'accept_lesson_application/',
        AcceptLessonApplicationView.as_view(),
        name='accept_lesson_application'
    ),
    path(
        'reject_lesson_application/',
        RejectLessonApplicationView.as_view(),
        name='reject_lesson_application'
    ),
]

payment_application_urlpatterns = [
    path(
        'create_payment_application/',
        CreatePaymentApplicationView.as_view(),
        name='create_payment_application'
    ),
    path(
        'get_incoming_applications/',
        GetIncomingPaymentApplicationsView.as_view(),
        name='get_incoming_payment_applications'
    ),
    path(
        'get_outgoing_applications/',
        GetOutgoingPaymentApplicationView.as_view(),
        name='get_outgoing_payment_applications'
    ),
    path(
        'accept_payment_application/',
        AcceptPaymentApplicationView.as_view(),
        name='accept_payment_application'
    ),
    path(
        'reject_payment_application/',
        RejectPaymentApplicationView.as_view(),
        name='reject_payment_application'
    ),
]

notification_urlpatterns = [
    path(
        'get_notifications/',
        GetNotificationsView.as_view(),
        name='get_notifications'
    ),
    path(
        'mark_notification_as_seen/',
        MarkNotificationAsSeenView.as_view(),
        name='mark_as_seen_notification'
    ),
]

report_urlpatterns = []

urlpatterns = [
    path(
        '',
        get_schema_view()
    ),
    path('', include(profile_urlpatterns)),
    path('', include(vacancy_urlpatterns)),
    path('', include(students_urlpatterns)),
    path('', include(lesson_urlpatterns)),
    path('', include(student_application_urlpatterns)),
    path('', include(lesson_application_urlpatterns)),
    path('', include(payment_application_urlpatterns)),
    path('', include(notification_urlpatterns)),
    path('', include(report_urlpatterns)),
]
