from rest_framework import permissions

from backend.models import Vacancy


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
