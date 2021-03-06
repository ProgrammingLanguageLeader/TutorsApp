from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

from rest_framework import serializers
from rest_framework_recaptcha.fields import ReCaptchaField

from users.models import User


class UserSerializer(serializers.ModelSerializer):
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

    def validate_password(self, password):
        try:
            password_validation.validate_password(password)
        except ValidationError as exception:
            raise serializers.ValidationError(str(exception))
        return password


class CreateUserSerializer(UserSerializer):
    recaptcha = ReCaptchaField()


class UploadAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('avatar', )

    avatar = serializers.ImageField(allow_null=False)


class DeleteAvatarSerializer(serializers.Serializer):
    pass
