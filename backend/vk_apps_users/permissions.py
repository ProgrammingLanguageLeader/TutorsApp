from django.contrib.auth import authenticate

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


class AuthenticatedUsingVkApps(permissions.BasePermission):
    def has_permission(self, request, view):
        return VkAppsAuthBackend.check_vk_apps_authentication(request)


class AuthenticatedUsingPasswordAndVkApps(AuthenticatedUsingVkApps):
    def has_permission(self, request, view):
        is_authenticated_via_vk = super().has_permission(request, view)
        if not is_authenticated_via_vk:
            return False
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(
            username=username, password=password
        )
        return bool(user)
