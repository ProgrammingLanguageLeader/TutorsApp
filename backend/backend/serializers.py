from rest_framework import serializers

from .models import (
    Profile,
    Vacancy,
    Schedule,
    Report,
    Subject
)


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
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


class UpdateProfileSerializer(serializers.Serializer):
    vk_id = serializers.IntegerField(required=True)
    subjects = SubjectSerializer(required=False)
    description = serializers.CharField(
        required=False,
        max_length=4096
    )
    mobile = serializers.BooleanField(
        required=False
    )
    activity_time_start = serializers.TimeField(
        required=False
    )
    activity_time_end = serializers.TimeField(
        required=False
    )
    latitude = serializers.FloatField(
        required=False
    )
    longitude = serializers.FloatField(
        required=False
    )
    distance_learning = serializers.BooleanField(required=False)
    ege = serializers.BooleanField(required=False)
    oge = serializers.BooleanField(default=False)
    foreign_lang_cert = serializers.BooleanField(
        required=False
    )
    school = serializers.BooleanField(
        required=False
    )
    university = serializers.BooleanField(
        required=False
    )

    def validate(self, attrs):
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
