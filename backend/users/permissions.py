from rest_framework import permissions


class AnonCreateOrSaveAndUpdateSelfOnly(permissions.BasePermission):
    safe_actions = ('list', 'retrieve', )

    def has_permission(self, request, view):
        is_authenticated = request.user and request.user.is_authenticated
        if view.action == 'create':
            return not is_authenticated
        return view.action in self.safe_actions or is_authenticated

    def has_object_permission(self, request, view, obj):
        if view.action in self.safe_actions:
            return True
        return obj.id == request.user.id