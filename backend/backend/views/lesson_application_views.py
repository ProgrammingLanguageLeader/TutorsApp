from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import LessonApplicationSerializer
from backend.serializers import GetLessonApplicationSerializer
from backend.models import Lesson
from backend.models import LessonApplication
from backend.models import Notification
from backend.models import NotificationEventChoice
from backend.permissions import LessonApplicationAnswerPermission
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response


class CreateLessonApplicationView(APIView):
    @check_authentication
    def post(self, request):
        user_id = request.data.get('user_id')
        lesson_id = request.data.get('lesson_id')
        request.data['lesson'] = lesson_id
        request.data['student'] = user_id
        application_serializer = LessonApplicationSerializer(
            data=request.data
        )
        if not application_serializer.is_valid():
            return Response(
                data=application_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        application = application_serializer.save()
        tutor_id = Lesson.objects.get(pk=lesson_id).tutor_id
        Notification.objects.create(
            profile_id=tutor_id,
            lesson_application_id=application.lesson_application_id,
            event=NotificationEventChoice.LESSON_APPLICATION_CREATION.value
        )
        return Response(data='OK')


class GetIncomingLessonApplicationsView(APIView):
    @check_authentication
    def get(self, request):
        user_id = self.request.query_params.get('user_id')
        applications = LessonApplication.objects.filter(
            lesson__tutor_id=user_id
        )
        application_serializer = GetLessonApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class GetOutgoingLessonApplicationView(APIView):
    @check_authentication
    def get(self, request):
        user_id = self.request.query_params.get('user_id')
        applications = LessonApplication.objects.filter(
            student_id=user_id
        )
        application_serializer = GetLessonApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class AcceptLessonApplicationView(APIView):
    permission_classes = (LessonApplicationAnswerPermission, )

    @check_authentication
    def post(self, request):
        application_id = request.data.get('lesson_application_id')
        try:
            application = LessonApplication.objects.get(pk=application_id)
        except LessonApplication.DoesNotExist:
            return get_error_message_response('lesson_application_id')
        lesson_id = application.lesson_id
        student_id = application.student_id
        lesson = Lesson.objects.get(pk=lesson_id)
        lesson.beginning_time = application.beginning_time
        lesson.ending_time = application.ending_time
        lesson.save()
        Notification.objects.create(
            profile_id=student_id,
            tutor_id=lesson_id,
            event=NotificationEventChoice.LESSON_APPLICATION_ACCEPT.value
        )
        application.delete()
        return Response(data='OK')


class RejectLessonApplicationView(APIView):
    permission_classes = (LessonApplicationAnswerPermission, )

    @check_authentication
    def post(self, request):
        application_id = request.data.get('lesson_application_id')
        try:
            application = LessonApplication.objects.get(pk=application_id)
        except LessonApplication.DoesNotExist:
            return get_error_message_response('lesson_application_id')
        student_id = application.student_id
        lesson_id = application.lesson_id
        Notification.objects.create(
            profile_id=student_id,
            lesson_id=lesson_id,
            event=NotificationEventChoice.LESSON_APPLICATION_REJECT.value
        )
        application.delete()
        return Response(data='OK')
