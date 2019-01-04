import re

from rest_framework import serializers

from users.models import User


class AbstractBaseUserSerializer:
    regexp = re.compile(r'^[\w.@+-]{3,30}$')

    def validate_username(self, username):
        regexp_search = self.regexp.search(username)
        if not regexp_search:
            raise serializers.ValidationError('This field is not correct')
        return username


class UserSerializer(serializers.ModelSerializer, AbstractBaseUserSerializer):
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

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        password = validated_data.get('password')
        user.set_password(password)
        user.save()
        return user

    def to_representation(self, instance):
        rep = super(UserSerializer, self).to_representation(instance)
        rep.pop('password', None)
        return rep


class UpdateUserSerializer(serializers.ModelSerializer, AbstractBaseUserSerializer):
    class Meta:
        model = User
        exclude = (
            'password',
            'is_superuser',
            'groups',
            'user_permissions',
        )
        read_only_fields = (
            'last_login',
            'date_joined',
            'is_active',
            'is_superuser',
            'groups',
            'user_permissions',
        )
