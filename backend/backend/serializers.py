from rest_framework import serializers

from .models import (
    Profile,
    Vacancy,
    Lesson,
    Report,
    Subject
)


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class CreateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def validate(self, attrs):
        super().validate(attrs)
        try:
            Profile.objects.get(vk_id__exact=attrs['vk_id'])
        except Profile.DoesNotExist:
            return serializers.ValidationError({
                'vk_id': [
                    'Invalid VK ID'
                ]
            })
        return attrs


class CreateVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'
