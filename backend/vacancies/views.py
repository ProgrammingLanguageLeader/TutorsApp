from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from vacancies.serializers import VacancySerializer, ReadVacancySerializer
from vacancies.models import Vacancy
from vacancies.filters import VacancyFilter
from vacancies.permissions import VacancyPermission


class VacanciesViewSet(viewsets.ModelViewSet):
    """
    create:
        Creates a vacancy

    retrieve:
        Returns the given vacancy

    list:
        Returns a list of vacancies

    update:
        Updates the given vacancy

    partial_update:
        Partially updates the given vacancy

    destroy:
        Deletes the given vacancy
    """
    queryset = Vacancy.objects.all()
    read_only_actions = ('retrieve', 'list', )
    filter_class = VacancyFilter

    def get_permissions(self):
        if self.action in self.read_only_actions:
            return IsAuthenticatedOrReadOnly(),
        return VacancyPermission(),

    def get_serializer_class(self):
        if self.action in self.read_only_actions:
            return ReadVacancySerializer
        return VacancySerializer
