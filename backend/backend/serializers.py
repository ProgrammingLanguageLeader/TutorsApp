from rest_framework import serializers

from backend.models import Profile
from backend.models import Vacancy
from backend.models import Lesson
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import LessonApplication


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        exclude = ('creation_time', )


class GetLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
        depth = 1


class UpdateLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        exclude = ('lesson_id', 'student', 'tutor', 'creation_time', )


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        exclude = ('creation_time', )


class GetVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'
        depth = 1


class UpdateVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        exclude = ('vacancy_id', 'creation_time', )


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('profile_id', 'creation_time', )


class StudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        exclude = ('creation_time', )


class GetStudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = '__all__'
        depth = 1


class LessonApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonApplication
        exclude = ('creation_time', )


class GetLessonApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonApplication
        fields = '__all__'
        depth = 1


class GetNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 1
