from rest_framework import serializers

from .models import Profile, Vacancy, Lesson, Application


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('vk_id', )


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
