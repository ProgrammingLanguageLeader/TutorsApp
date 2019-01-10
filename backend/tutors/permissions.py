from rest_framework.permissions import BasePermission


class IsStudentOrIsTutor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.tutor.id or \
            request.user.id == obj.student.id


class IsTutor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.tutor.id
