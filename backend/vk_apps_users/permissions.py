from rest_framework import permissions

from vk_apps_users.authentication import VkAppsAuthBackend


class AuthenticatedCreateUserOrSelfOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        is_authenticated_via_vk = VkAppsAuthBackend. \
            check_vk_apps_authentication(request)
        if not is_authenticated_via_vk:
            return False
        if view.action == 'create':
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.user.id
