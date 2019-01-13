from django.conf import settings

from rest_framework import serializers

from vacancies.models import Vacancy
from vacancies.tools import get_class


UserSerializer = get_class(
    *settings.AUTH_USER_MODEL_SERIALIZER.rsplit(
        sep='.',
        maxsplit=1
    )
)


class VacancySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    price = serializers.IntegerField(min_value=0, max_value=10000)

    class Meta:
        model = Vacancy
        fields = '__all__'
        read_only_fields = ('is_active', )


class ReadVacancySerializer(VacancySerializer):
    owner = UserSerializer()
