import rest_framework_filters as filters

from vacancies.models import Vacancy


class VacancyFilter(filters.FilterSet):
    class Meta:
        model = Vacancy
        fields = '__all__'

    price__gte = filters.NumberFilter(
        field_name='price',
        lookup_expr='gte',
        label='Price minimum'
    )

    price__lte = filters.NumberFilter(
        field_name='price',
        lookup_expr='lte',
        label='Price maximum'
    )

    creation_time__gte = filters.DateTimeFilter(
        field_name='creation_time',
        lookup_expr='gte',
        label='Creation time minimum'
    )

    creation_time__lte = filters.DateTimeFilter(
        field_name='creation_time',
        lookup_expr='lte',
        label='Creation time maximum'
    )
