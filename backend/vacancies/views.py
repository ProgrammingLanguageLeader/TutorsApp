from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from vacancies.serializers import VacancySerializer, ReadVacancySerializer
from vacancies.models import Vacancy


class VacanciesViewSet(viewsets.ModelViewSet):
    queryset = Vacancy.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly, )
    read_only_actions = ('retrieve', 'list', )

    def get_serializer_class(self):
        if self.action in self.read_only_actions:
            return ReadVacancySerializer
        return VacancySerializer
