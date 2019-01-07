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


class UserSerializer(serializers.ModelSerializer,
                     AbstractBaseUserSerializer):
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
            'avatar',
        )
        write_only_fields = (
            'password',
        )

    def to_representation(self, instance):
        rep = super(UserSerializer, self).to_representation(instance)
        rep.pop('password', None)
        return rep

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        password = validated_data.get('password')
        user.set_password(password)
        user.save()
        return user


class UpdateUserSerializer(serializers.ModelSerializer,
                           AbstractBaseUserSerializer):
    class Meta:
        model = User
        exclude = (
            'password',
            'is_superuser',
            'groups',
            'user_permissions',
            'avatar'
        )
        read_only_fields = (
            'last_login',
            'date_joined',
            'is_active',
            'is_superuser',
            'groups',
            'user_permissions',
        )
