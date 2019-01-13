from rest_framework_filters import FilterSet

from vacancies.models import Vacancy


class VacancyFilter(FilterSet):
    class Meta:
        model = Vacancy
        fields = '__all__'
