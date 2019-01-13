from django.db.models import Q
from rest_framework.decorators import action

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, mixins

from tutors.serializers import StudentRequestSerializer, \
    ReadStudentRequestSerializer, AcceptStudentRequestSerializer
from tutors.models import TutorStudents, StudentRequest
from tutors.permissions import IsStudentOrIsTutor, IsTutor
from tutors.filters import StudentRequestsFilter
from users.serializers import UserSerializer


class StudentsViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
    """
    retrieve:
        Return the given student

    list:
        Return a list of students

    destroy:
        Delete the given student
    """
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = TutorStudents.objects.all()

    def get_queryset(self):
        tutor, created = TutorStudents.objects.get_or_create(
            user=self.request.user,
        )
        return tutor.students.all()


class StudentRequestsViewSet(mixins.CreateModelMixin,
                             mixins.DestroyModelMixin,
                             mixins.ListModelMixin,
                             mixins.RetrieveModelMixin,
                             viewsets.GenericViewSet):
    """
    create:
        Creates a student request

    retrieve:
        Returns the given student request

    list:
        Returns a list of student requests

    destroy:
        Deletes the given student request

    accept:
        Deletes the given request and adds the student from the request
        to a list of tutor students
    """
    permission_classes = (IsStudentOrIsTutor,)
    queryset = StudentRequest.objects.all()
    read_only_actions = ('retrieve', 'list',)
    filter_class = StudentRequestsFilter

    def get_queryset(self):
        return StudentRequest.objects.filter(
            Q(student=self.request.user) |
            Q(tutor=self.request.user)
        )

    def get_serializer_class(self):
        if self.action in self.read_only_actions:
            return ReadStudentRequestSerializer
        if self.action == 'accept':
            return AcceptStudentRequestSerializer
        return StudentRequestSerializer

    @action(detail=True, methods=['post'],
            permission_classes=[IsTutor],
            name='Student Request Accept')
    def accept(self, request, *args, **kwargs):
        student_request = self.get_object()
        student = student_request.student
        tutor, created = TutorStudents.objects.get_or_create(
            user=student_request.tutor
        )
        tutor.students.add(student)
        student_request.delete()
        return Response({
            'status': 'student was added'
        })
