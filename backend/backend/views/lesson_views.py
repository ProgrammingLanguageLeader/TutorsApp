from django.db.models import Q
from django.utils.dateparse import parse_datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import LessonSerializer
from backend.serializers import UpdateLessonSerializer
from backend.serializers import GetLessonSerializer
from backend.models import Lesson
from backend.models import Students
from backend.models import Profile
from backend.models import Notification
from backend.models import NotificationEventChoice
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response
from backend.permissions import EditLessonPermission


class CreateLessonView(APIView):
    lessons_limit = 100

    @staticmethod
    def check_timing(tutor_id, student_id, beginning_time, ending_time):
        if beginning_time >= ending_time:
            return False
        lessons = list(Lesson.objects.filter(tutor_id=tutor_id))
        lessons += list(Lesson.objects.filter(student_id=student_id))
        for lesson in lessons:
            if beginning_time < lesson.beginning_time < ending_time:
                return False
            if beginning_time < lesson.ending_time < ending_time:
                return False
        return True

    @staticmethod
    def check_limit(tutor_id):
        existing_lessons = Lesson.objects.filter(tutor_id=tutor_id)
        return len(existing_lessons) < CreateLessonView.lessons_limit

    @staticmethod
    def check_existing_student(tutor_id, student_id):
        try:
            Students.objects.get(
                tutor_id=tutor_id
            ).students.get(
                profile_id=student_id
            )
        except Profile.DoesNotExist:
            return False
        return True

    @check_authentication
    def post(self, request):
        tutor_id = request.data.get('user_id')
        student_id = request.data.get('student_id')
        beginning_time = parse_datetime(
            request.data.get('beginning_time')
        )
        ending_time = parse_datetime(
            request.data.get('ending_time')
        )
        request.data['tutor'] = tutor_id
        request.data['student'] = student_id
        lesson_serializer = LessonSerializer(data=request.data)
        if not lesson_serializer.is_valid():
            return Response(
                data=lesson_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        if not self.check_limit(tutor_id):
            return Response(
                data="You have reached a limit of lessons number",
                status=HTTP_400_BAD_REQUEST
            )
        if not self.check_existing_student(tutor_id, student_id):
            return get_error_message_response('student_id')
        if not self.check_timing(
                tutor_id, student_id, beginning_time, ending_time
        ):
            return get_error_message_response('beginning_time', 'ending_time')
        lesson = lesson_serializer.save()
        Notification.objects.create(
            profile_id=student_id,
            lesson_id=lesson.lesson_id,
            event=NotificationEventChoice.LESSON_CREATION.value
        )
        return Response(data='OK')


class GetLessonsView(APIView):
    @check_authentication
    def get(self, request):
        user_id = self.request.query_params.get('user_id')
        lessons = Lesson.objects.filter(
            Q(tutor_id=user_id) | Q(student_id=user_id)
        )
        lesson_serializer = GetLessonSerializer(lessons, many=True)
        return Response(data=lesson_serializer.data)


class UpdateLessonView(APIView):
    permission_classes = (EditLessonPermission, )

    @check_authentication
    def post(self, request):
        lesson_id = request.data.get('lesson_id')
        view_serializer = UpdateLessonSerializer(data=request.data)
        if not view_serializer.is_valid():
            return Response(
                data=view_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
            for (key, value) in view_serializer.validated_data.items():
                setattr(lesson, key, value)
        except Lesson.DoesNotExist:
            return get_error_message_response('lesson_id')
        lesson.save()
        Notification.objects.create(
            profile_id=lesson.student_id,
            lesson_id=lesson_id,
            event=NotificationEventChoice.LESSON_CHANGING.value
        )
        return Response(data='OK')


class DeactivateLessonView(APIView):
    permission_classes = (EditLessonPermission, )

    @check_authentication
    def post(self, request):
        lesson_id = request.data.get('lesson_id')
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return get_error_message_response('lesson_id')
        notifying_user_id = lesson.student_id
        lesson.is_active = False
        lesson.save()
        Notification.objects.create(
            profile_id=notifying_user_id,
            lesson_id=lesson_id,
            event=NotificationEventChoice.LESSON_DEACTIVATION.value
        )
        return Response(data='OK')


class DeleteLessonView(APIView):
    permission_classes = (EditLessonPermission, )

    @check_authentication
    def post(self, request):
        lesson_id = request.data.get('lesson_id')
        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return get_error_message_response('lesson_id')
        lesson.delete()
        return Response(data='OK')
