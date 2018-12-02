from rest_framework import permissions

from backend.models import Vacancy
from backend.models import Lesson


class EditVacancyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.data.get('user_id') \
            or request.query_params.get('user_id')
        vacancy_id = request.data.get('vacancy_id') \
            or request.query_params.get('vacancy_id')
        try:
            vacancy = Vacancy.objects.get(pk=vacancy_id)
        except Vacancy.DoesNotExist:
            return False
        return vacancy.owner_id == int(user_id)


class EditLessonPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.data.get('user_id') \
            or request.query_params.get('user_id')
        lesson_id = request.data.get('lesson_id') \
            or request.query_params.get('lesson_id')
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return False
        return lesson.tutor_id == int(user_id)


class DeleteLessonPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.data.get('user_id') \
                  or request.query_params.get('user_id')
        lesson_id = request.data.get('lesson_id') \
                    or request.query_params.get('lesson_id')
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return False
        return lesson.tutor_id == int(user_id) \
            or lesson.student_id == int(user_id)
