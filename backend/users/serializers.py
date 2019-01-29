import re

from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

from rest_framework import serializers
from rest_framework_recaptcha.fields import ReCaptchaField

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    username_regexp = re.compile(r'^[\w.@+-]{3,30}$')

    password = serializers.CharField(style={
        'input_type': 'password'
    })

    class Meta:
        model = User
        exclude = (
            'is_superuser',
            'groups',
            'user_permissions',
        )
        read_only_fields = (
            'last_login',
            'date_joined',
            'is_active',
        )
        write_only_fields = (
            'password',
        )

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.pop('password', None)
        rep['avatar'] = instance.avatar_url_or_default
        return rep

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        password = validated_data.get('password')
        instance.set_password(password)
        instance.save()
        return instance

    def validate_username(self, username):
        regexp_search = self.username_regexp.search(username)
        if not regexp_search:
            raise serializers.ValidationError('This field is not correct')
        return username

    def validate_password(self, password):
        try:
            password_validation.validate_password(password)
        except ValidationError as exception:
            raise serializers.ValidationError(str(exception))
        return password


class CreateUserSerializer(UserSerializer):
    recaptcha = ReCaptchaField()


class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar', )
