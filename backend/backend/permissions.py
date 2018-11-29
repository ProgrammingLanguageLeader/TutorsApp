from rest_framework import permissions


class CreateProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.data.get('user_id') \
            or request.query_params.get('user_id')
        vk_id = request.data.get('vk_id') \
            or request.query_params.get('vk_id')
        return user_id == vk_id
