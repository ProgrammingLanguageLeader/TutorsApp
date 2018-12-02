from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import LessonSerializer
from backend.models import Vacancy
from backend.models import Lesson
from backend.models import Students
from backend.models import Profile
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response


class CreateLessonView(APIView):
    lessons_limit = 100

    @check_authentication
    def post(self, request):
        tutor_id = request.data['user_id']
        student_id = request.data['student_id']
        request.data['tutor'] = tutor_id
        request.data['student'] = student_id
        lesson_serializer = LessonSerializer(data=request.data)
        if not lesson_serializer.is_valid():
            return Response(
                data=lesson_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        existing_lessons = Lesson.objects.filter(tutor_id=tutor_id)
        if len(existing_lessons) >= self.lessons_limit:
            return Response(
                data="You have reached a limit of lessons number",
                status=HTTP_400_BAD_REQUEST
            )
        try:
            Students.objects.get(
                tutor_id=tutor_id
            ).students.get(
                profile_id=student_id
            )
        except Profile.DoesNotExist:
            return get_error_message_response('student_id')
        lesson_serializer.save()
        return Response(data='OK')


class GetLessonsView(APIView):
    @check_authentication
    def get(self, request):
        user_id = self.request.query_params.get('user_id')
        lessons = Lesson.objects.filter(
            Q(tutor_id=user_id) | Q(student_id=user_id)
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
