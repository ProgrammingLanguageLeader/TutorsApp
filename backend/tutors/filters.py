from django_filters.rest_framework import FilterSet

from tutors.models import StudentRequest


class StudentRequestsFilter(FilterSet):
    class Meta:
        model = StudentRequest
        fields = '__all__'
