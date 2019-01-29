import io

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from PIL import Image

from users.models import User
from users.serializers import UserSerializer, CreateUserSerializer, \
    AvatarUploadSerializer
from users.permissions import AnonCreateOrSaveAndUpdateSelfOnly, \
    AvatarUploadSelfOnly


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

    upload_avatar:
        Uploads an avatar to the authenticated user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AnonCreateOrSaveAndUpdateSelfOnly(), )

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        if self.action == 'upload_avatar':
            return AvatarUploadSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action == 'upload_avatar':
            return AvatarUploadSelfOnly(),
        return self.permission_classes

    @action(detail=True, methods=['patch'], name='Upload Avatar',
            parser_classes=(MultiPartParser, ))
    def upload_avatar(self, request, pk=None, **kwargs):
        user = self.get_object()
        avatar = request.data['avatar']
        user.avatar.save(avatar.name, avatar, save=True)
        return Response(status=status.HTTP_200_OK)
