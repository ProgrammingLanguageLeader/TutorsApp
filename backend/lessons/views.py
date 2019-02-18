from django.db.models import Q

from rest_framework import viewsets

from lessons.filters import LessonFilter
from lessons.models import Lesson
from lessons.permissions import IsTutorOrIsStudentAndReadOnly
from lessons.serializers import LessonSerializer, GetLessonSerializer


class LessonViewSet(viewsets.ModelViewSet):
    """
    create:
        Creates a lesson

    retrieve:
        Returns the given lesson

    list:
        Returns a list of lessons

    update:
        Updates the given lesson

    partial_update:
        Partially updates the given lesson

    destroy:
        Deletes the given lesson
    """
    queryset = Lesson.objects.all()
    permission_classes = (IsTutorOrIsStudentAndReadOnly, )
    serializer_class = LessonSerializer
    filterset_class = LessonFilter

    def get_serializer_class(self):
        if self.action in ('retrieve', 'list'):
            return GetLessonSerializer
        return self.serializer_class

    def get_queryset(self):
        return self.queryset.filter(
            Q(tutor=self.request.user) |
            Q(student=self.request.user)
        )
