from rest_framework.permissions import BasePermission


class VacancyPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.owner.id
