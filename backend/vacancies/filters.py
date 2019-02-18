import django_filters.rest_framework as filters

from vacancies.models import Vacancy


class VacancyFilter(filters.FilterSet):
    class Meta:
        model = Vacancy
        exclude = ('subject', )

    subject = filters.CharFilter(
        field_name='subject',
        lookup_expr='icontains',
        label='Subject'
    )

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

    city = filters.CharFilter(
        field_name='owner__city',
        lookup_expr='icontains',
        label='Owner\'s city'
    )

    district = filters.CharFilter(
        field_name='owner__district',
        lookup_expr='icontains',
        label='Owner\'s district'
    )

    metro = filters.CharFilter(
        field_name='owner__metro',
        lookup_expr='icontains',
        label='Owner\'s metro station'
    )
