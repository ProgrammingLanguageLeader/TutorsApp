from django.db.models import Q
from rest_framework.decorators import action

from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework import viewsets, mixins, generics

from tutors.serializers import TutorSerializer, DeleteStudentSerializer, \
    StudentRequestSerializer, ReadStudentRequestSerializer, \
    AcceptStudentRequestSerializer
from tutors.models import Tutor, StudentRequest
from tutors.permissions import IsStudentOrIsTutor, IsTutor
from tutors.filters import StudentRequestsFilter
from users.serializers import UserSerializer


class StudentsView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        tutor, created = Tutor.objects.get_or_create(
            user=request.user,
        )
        serializer = UserSerializer(tutor.students, many=True)
        return Response(serializer.data)

    @staticmethod
    def custom_exception_handler(exc, context):
        if isinstance(exc, Tutor.DoesNotExist):
            exc = NotFound()
        response = exception_handler(exc, context)
        if response is not None:
            response.data['status_code'] = response.status_code
        return response

    def get_exception_handler(self):
        return self.custom_exception_handler


class DeleteStudentView(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request):
        serializer = DeleteStudentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, HTTP_400_BAD_REQUEST)
        student_id = serializer.validated_data.get('student')
        tutor, created = Tutor.objects.get_or_create(
            user=request.user
        )
        tutor.students.remove(student_id)
        serializer = TutorSerializer(tutor)
        return Response(serializer.data)


class StudentRequestsViewSet(mixins.CreateModelMixin,
                             mixins.DestroyModelMixin,
                             mixins.ListModelMixin,
                             mixins.RetrieveModelMixin,
                             viewsets.GenericViewSet):
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
        tutor, created = Tutor.objects.get_or_create(
            user=student_request.tutor
        )
        tutor.students.add(student)
        student_request.delete()
        return Response({
            'status': 'student was added'
        })
