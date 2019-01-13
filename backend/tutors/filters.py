from rest_framework_filters import FilterSet

from tutors.models import StudentRequest


class StudentRequestsFilter(FilterSet):
    class Meta:
        model = StudentRequest
        fields = '__all__'
