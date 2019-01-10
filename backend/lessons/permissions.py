from rest_framework.permissions import BasePermission


class IsTutorOrIsStudentAndReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        is_tutor = request.user.id == obj.tutor.id
        is_student = request.user.id == obj.student.id
        if is_tutor:
            return True
        return is_student and view.action == 'retrieve'
