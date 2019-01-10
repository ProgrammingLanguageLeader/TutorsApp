from django.db.models import Q

from rest_framework import viewsets

from lessons.models import Lesson
from lessons.permissions import IsTutorOrIsStudentAndReadOnly
from lessons.serializer import LessonSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    permission_classes = (IsTutorOrIsStudentAndReadOnly, )
    serializer_class = LessonSerializer

    def get_queryset(self):
        return self.queryset.filter(
            Q(tutor=self.request.user) |
            Q(student=self.request.user)
        )
