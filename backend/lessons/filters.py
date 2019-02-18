import django_filters.rest_framework as filters

from lessons.models import Lesson


class LessonFilter(filters.FilterSet):
    class Meta:
        model = Lesson
        fields = '__all__'

    beginning_time__gte = filters.DateTimeFilter(
        field_name='beginning_time',
        lookup_expr='gte',
        label='Beginning time minimum'
    )

    beginning_time__lte = filters.DateTimeFilter(
        field_name='beginning_time',
        lookup_expr='lte',
        label='Beginning time maximum'
    )

    ending_time__gte = filters.DateTimeFilter(
        field_name='ending_time',
        lookup_expr='gte',
        label='Ending time minimum'
    )

    ending_time__lte = filters.DateTimeFilter(
        field_name='ending_time',
        lookup_expr='lte',
        label='Ending time maximum'
    )
