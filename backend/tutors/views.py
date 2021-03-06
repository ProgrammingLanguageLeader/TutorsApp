from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, mixins, generics, status
from rest_framework.exceptions import NotFound

from tutors.serializers import StudentRequestSerializer, \
    ReadStudentRequestSerializer, AcceptStudentRequestSerializer
from tutors.models import TutorStudents, StudentRequest
from tutors.permissions import IsStudentOrIsTutor, IsTutor
from tutors.filters import StudentRequestsFilter
from tutors.signals import student_request_answer

from users.serializers import UserSerializer
from users.models import User

from lessons.models import Lesson

from notifications.models import Notification


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

    def destroy(self, request, pk=None, *args, **kwargs):
        try:
            tutor = TutorStudents.objects.get(user=self.request.user)
            student = User.objects.get(pk=pk)
            tutor.students.remove(student)
            Lesson.objects.filter(student=student).delete()
            Notification.objects.create(
                sender=tutor.user,
                recipient=student,
                verb='student delete'
            )
        except ObjectDoesNotExist:
            raise NotFound()
        return Response('OK')


class TutorsListView(generics.ListAPIView):
    """
    Returns a list of tutors of the current user
    """
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer

    def get_queryset(self):
        tutors_ids = TutorStudents.objects.filter(
            students__in=[self.request.user.id],
        ).values_list('user', flat=True)
        tutors = User.objects.filter(
            id__in=tutors_ids
        )
        return tutors


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
    filterset_class = StudentRequestsFilter

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

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user != instance.student:
            student_request_answer.send(
                sender=StudentRequest,
                instance=self.get_object(),
                accepted=False
            )
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['post'],
            permission_classes=[IsTutor],
            name='Student Request Accept')
    def accept(self, request, *args, **kwargs):
        student_request = self.get_object()
        student_request_answer.send(
            sender=StudentRequest,
            instance=student_request,
            accepted=True
        )
        student = student_request.student
        tutor, created = TutorStudents.objects.get_or_create(
            user=student_request.tutor
        )
        tutor.students.add(student)
        student_request.delete()
        return Response(status=status.HTTP_200_OK)
