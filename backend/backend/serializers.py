from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.models import Vacancy
from backend.models import Lesson
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import LessonApplication
from backend.models import PaymentApplication


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
        model = get_user_model()
        exclude = ('user', )


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ('user', 'profile_id', 'creation_time', )


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


class PaymentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentApplication
        exclude = ('creation_time',)


class GetPaymentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentApplication
        fields = '__all__'
        depth = 1


class GetNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        exclude = ('profile', )
        depth = 2
