from rest_framework import serializers

from backend.models import Profile
from backend.models import Vacancy
from backend.models import Lesson
from backend.models import StudentApplication
from backend.models import Notification


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class GetLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
        depth = 1


class UpdateLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        exclude = ('lesson_id', 'student', 'tutor', )


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'


class GetVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'
        depth = 1


class UpdateVacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        exclude = ('vacancy_id', )


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('profile_id', )


class StudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = '__all__'


class GetStudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = '__all__'
        depth = 1


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 1
