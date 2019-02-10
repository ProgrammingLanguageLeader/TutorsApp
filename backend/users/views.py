from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from users.models import User
from users.serializers import UserSerializer, CreateUserSerializer, \
    UploadAvatarSerializer, DeleteAvatarSerializer
from users.permissions import AnonCreateOrSaveAndUpdateSelfOnly, \
    AvatarUploadSelfOnly


class UsersViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                   mixins.UpdateModelMixin,
                   viewsets.GenericViewSet):
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

    upload_avatar:
        Uploads an avatar of the authenticated user

    delete_avatar:
        Deletes an avatar of the authenticated user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AnonCreateOrSaveAndUpdateSelfOnly(), )

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateUserSerializer
        if self.action == 'upload_avatar':
            return UploadAvatarSerializer
        if self.action == 'delete_avatar':
            return DeleteAvatarSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action == 'upload_avatar':
            return AvatarUploadSelfOnly(),
        return self.permission_classes

    @action(detail=True, methods=['patch'], name='Upload Avatar',
            parser_classes=(MultiPartParser, ))
    def upload_avatar(self, request, pk=None, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        user = self.get_object()
        avatar = request.data['avatar']
        user.avatar.save('', avatar, save=True)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], name='Delete Avatar')
    def delete_avatar(self, request, pk=None, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        user = self.get_object()
        user.avatar.delete(save=True)
        return Response(status=status.HTTP_200_OK)
