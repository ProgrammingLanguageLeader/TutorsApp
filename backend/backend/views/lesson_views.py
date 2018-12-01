from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import LessonSerializer
from backend.models import Vacancy, Lesson
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response


# TODO: check if lesson number is less than 100
class AddLessonView(APIView):
    @check_authentication
    def post(self, request):
        lesson_serializer = LessonSerializer(data=request.data)
        if lesson_serializer.is_valid():
            lesson_serializer.save()
            return Response(data='OK')
        return Response(
            data=lesson_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetLessonsView(APIView):
    @check_authentication
    def get(self, request):
        tutor_id = self.request.query_params.get('tutor')
        student_id = self.request.query_params.get('student')
        lessons = []
        if tutor_id:
            lessons = Lesson.objects.filter(
                tutor__vk_id=tutor_id
            )
        elif student_id:
            lessons = Lesson.objects.filter(
                student__vk_id=student_id
            )
        lesson_serializer = LessonSerializer(lessons, many=True)
        return Response(data=lesson_serializer.data)


class DeleteLessonView(APIView):
    @check_authentication
    def post(self, request):
        try:
            id = request.data['id']
            schedule = Lesson.objects.get(pk=id)
        except Vacancy.DoesNotExist:
            return get_error_message_response('id')
        schedule.is_active = False
        schedule.save()
        return Response(data='OK')
