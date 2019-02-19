from rest_framework import serializers

from vacancies.models import Vacancy

from users.serializers import UserSerializer


class VacancySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Vacancy
        fields = '__all__'
        read_only_fields = ('is_active', )


class ReadVacancySerializer(VacancySerializer):
    owner = UserSerializer()
