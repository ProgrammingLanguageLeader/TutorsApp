from rest_framework import permissions

from backend.models import Vacancy
from backend.models import Lesson
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import LessonApplication
from backend.models import PaymentApplication


class EditVacancyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        vacancy_id = params.get('vacancy_id')
        try:
            vacancy = Vacancy.objects.get(pk=vacancy_id)
        except Vacancy.DoesNotExist:
            return False
        return vacancy.owner_id == int(vk_user_id)


class EditLessonPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        lesson_id = params.get('lesson_id')
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return False
        return lesson.tutor_id == int(vk_user_id)


class StudentApplicationAnswerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        application_id = params.get('student_application_id')
        try:
            application = StudentApplication.objects.get(pk=application_id)
        except StudentApplication.DoesNotExist:
            return False
        tutor_id = application.vacancy.owner_id
        return int(vk_user_id) == int(tutor_id)


class LessonApplicationAnswerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        application_id = params.get('lesson_application_id')
        try:
            application = LessonApplication.objects.get(pk=application_id)
        except LessonApplication.DoesNotExist:
            return False
        tutor_id = application.lesson.tutor_id
        return int(vk_user_id) == int(tutor_id)


class PaymentApplicationAnswerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        application_id = params.get('payment_application_id')
        try:
            application = PaymentApplication.objects.get(pk=application_id)
        except PaymentApplication.DoesNotExist:
            return False
        student_id = application.student_id
        return int(vk_user_id) == int(student_id)


class MarkNotificationAsSeenPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        params = request.query_params \
            if request.method == 'GET' \
            else request.data
        vk_user_id = params.get('vk_user_id')
        notification_id = request.data.get('notification_id')
        try:
            notification = Notification.objects.get(pk=notification_id)
        except Notification.DoesNotExist:
            return False
        return int(vk_user_id) == int(notification.profile_id)
