from rest_framework.views import APIView
from rest_framework.response import Response

from backend.serializers import ProfileSerializer
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response
from backend.models import Students


class GetStudentsView(APIView):
    @check_authentication
    def get(self, request):
        tutor_id = self.request.query_params.get('tutor_id')
        students = Students.objects.get(pk=tutor_id).students
        student_serializer = ProfileSerializer(students, many=True)
        return Response(data=student_serializer.data)


class DeleteStudentView(APIView):
    @check_authentication
    def post(self, request):
        student_id = request.data['student_id']
        tutor_id = request.data['user_id']
        try:
            students = Students.objects.get(pk=tutor_id).students
            students.remove(student_id)
        except Students.DoesNotExist:
            return get_error_message_response('tutor_id')
        return Response(data='OK')
