from django.utils.translation import ugettext_lazy as _

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

    def run_validators(self, value):
        owner = value.get('owner')
        subject = value.get('subject')
        owner_and_subject_vacancies = Vacancy.objects.filter(
            owner=owner,
            subject=subject
        )
        if owner_and_subject_vacancies:
            raise serializers.ValidationError(
                _('vacancy of this subject already exists')
            )
        return super().run_validators(value)


class ReadVacancySerializer(VacancySerializer):
    owner = UserSerializer()
