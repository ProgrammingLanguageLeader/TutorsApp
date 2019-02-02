from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from users.serializers import UserSerializer

from vk_apps_users.models import VkAppsUser


class VkAppsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = VkAppsUser
        fields = '__all__'

    vk_id = serializers.IntegerField(min_value=1, validators=[
        UniqueValidator(VkAppsUser.objects.all())
    ])


class GetVkAppsUserSerializer(VkAppsUserSerializer):
    user = UserSerializer()
