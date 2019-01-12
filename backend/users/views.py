from rest_framework import viewsets

from users.models import User
from users.serializers import UserSerializer, UpdateUserSerializer
from users.permissions import AnonCreateOrSaveAndUpdateSelfOnly


class UsersViewSet(viewsets.ModelViewSet):
    """
    create:
        Creates a user

    retrieve:
        Returns the given user

    list:
        Returns a list of users

    update:
        Updates the given user

    partial_update:
        Partially updates the given user

    destroy:
        Deletes the given user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AnonCreateOrSaveAndUpdateSelfOnly, )

    def get_serializer_class(self):
        if self.action in ('update', 'partial_update'):
            return UpdateUserSerializer
        return self.serializer_class
