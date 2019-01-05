from rest_framework import viewsets

from users.models import User
from users.serializers import UserSerializer, UpdateUserSerializer
from users.permissions import AnonCreateOrSaveAndUpdateSelfOnly


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AnonCreateOrSaveAndUpdateSelfOnly, )

    def get_serializer_class(self):
        if self.action in ('update', 'partial_update'):
            return UpdateUserSerializer
        return self.serializer_class
