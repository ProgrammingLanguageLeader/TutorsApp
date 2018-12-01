from rest_framework.views import APIView
from rest_framework.response import Response

from backend.serializers import ProfileSerializer
from backend.views.tools import check_authentication
from backend.models import Students


class GetStudentsView(APIView):
    @check_authentication
    def get(self, request):
        tutor_id = self.request.query_params.get('tutor_id')
        students = Students.objects.get(pk=tutor_id)
        student_serializer = ProfileSerializer(students, many=True)
        return Response(data=student_serializer.data)
