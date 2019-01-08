from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from tutors.serializers import TutorSerializer, DeleteStudentSerializer
from tutors.models import Tutor
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
