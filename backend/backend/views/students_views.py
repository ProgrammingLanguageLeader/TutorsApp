from rest_framework.views import APIView
from rest_framework.response import Response

from backend.serializers import ProfileSerializer
from backend.views.tools import check_authentication
from backend.models import Students
from backend.models import Notification
from backend.models import NotificationEventChoice


class GetStudentsView(APIView):
    @check_authentication
    def get(self, request):
        tutor_id = self.request.query_params.get('tutor_id')
        students_table, created = Students.objects.get_or_create(
            tutor_id=tutor_id
        )
        students = students_table.students
        student_serializer = ProfileSerializer(students, many=True)
        return Response(data=student_serializer.data)


class DeleteStudentView(APIView):
    @check_authentication
    def post(self, request):
        student_id = request.data.get('student_id')
        tutor_id = request.data.get('vk_user_id')
        students_table, created = Students.objects.get_or_create(
            tutor_id=tutor_id
        )
        students = students_table.students
        students.remove(student_id)
        Notification.objects.create(
            profile_id=student_id,
            event=NotificationEventChoice.DELETION_FROM_STUDENTS.value
        )
        return Response(data='OK')
