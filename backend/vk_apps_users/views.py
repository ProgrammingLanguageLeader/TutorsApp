from random import choice
from string import ascii_lowercase, digits

from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from vk_apps_users.permissions import AuthenticatedCreateUserOrSelfOnly, \
    AuthenticatedUsingPasswordAndVKApps
from vk_apps_users.serializers import VkAppsUserSerializer
from vk_apps_users.models import VkAppsUser


class VkAppsUsersViewSet(mixins.CreateModelMixin,
                         mixins.DestroyModelMixin,
                         mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):
    """
    create:
        Creates user by VK Apps credentials with random username and
        unusable password
    destroy:
        Deletes connection between VK ID and user
    retrieve:
        Returns the given user with VK ID
    connect:
        Creates connection between existing user and VK ID providing
        an opportunity to authenticate via VK Apps
    """
    UserModel = get_user_model()
    queryset = VkAppsUser.objects.all()
    serializer_class = VkAppsUserSerializer
    permission_classes = (AuthenticatedCreateUserOrSelfOnly,)

    @staticmethod
    def generate_random_username(
            length=16, chars=ascii_lowercase + digits,
            split=4, delimiter='-'
    ):
        unique_generated = False
        while not unique_generated:
            username = ''.join([choice(chars) for index in range(length)])
            if split:
                username = delimiter.join([
                    username[start:start + split]
                    for start in range(0, len(username), split)
                ])
            try:
                VkAppsUsersViewSet.UserModel.objects.get(username=username)
            except ObjectDoesNotExist:
                return username

    def create(self, request, **kwargs):
        username = self.generate_random_username()
        user = self.UserModel.objects.create(username=username)
        user.set_unusable_password()
        user.save()
        vk_id = request.data.get('vk_user_id')
        serializer = VkAppsUserSerializer(data={
            'vk_id': vk_id,
            'user': user.id,
        })
        if not serializer.is_valid():
            user.delete()
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        vk_apps_user = VkAppsUser.objects.create(user=user, vk_id=vk_id)
        return Response(VkAppsUserSerializer(vk_apps_user).data)

    @action(detail=False, methods=['post'],
            permission_classes=[AuthenticatedUsingPasswordAndVKApps],
            name='Connect User')
    def connect(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        vk_id = request.data.get('vk_user_id')
        serializer = VkAppsUserSerializer(data={
            'vk_id': vk_id,
            'user': user.id,
        })
        if not serializer.is_valid():
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        vk_apps_user = VkAppsUser.objects.create(user=user, vk_id=vk_id)
        return Response(VkAppsUserSerializer(vk_apps_user).data)
