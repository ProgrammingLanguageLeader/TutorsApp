from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('date_joined', )
