from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import StudentApplicationSerializer
from backend.models import Vacancy
from backend.models import Students
from backend.models import StudentApplication
from backend.models import Notification
from backend.models import NotificationEventChoice
from backend.permissions import StudentApplicationAnswerPermission

from tools.errors import get_error_message_response


class CreateStudentApplicationView(APIView):
    @staticmethod
    def check_repeating_application(vacancy_id, student_id):
        vacancy = Vacancy.objects.get(pk=vacancy_id)
        tutor_id = vacancy.owner_id
        try:
            students = Students.objects.get(tutor_id=tutor_id).students
        except Students.DoesNotExist:
            return True
        return len(students.filter(profile_id=student_id)) == 0

    def post(self, request):
        vk_user_id = request.data.get('vk_user_id')
        vacancy_id = request.data.get('vacancy_id')
        request.data['vacancy'] = vacancy_id
        request.data['student'] = vk_user_id
        application_serializer = StudentApplicationSerializer(
            data=request.data
        )
        if not application_serializer.is_valid():
            return Response(
                data=application_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        if not self.check_repeating_application(vacancy_id, vk_user_id):
            return Response(
                data="You have already become a student",
                status=HTTP_400_BAD_REQUEST
            )
        application = application_serializer.save()
        tutor_id = Vacancy.objects.get(pk=vacancy_id).owner_id
        Notification.objects.create(
            profile_id=tutor_id,
            student_application_id=application.student_application_id,
            event=NotificationEventChoice.STUDENT_APPLICATION_CREATION.value
        )
        return Response(data='OK')


class GetIncomingStudentApplicationsView(APIView):
    def get(self, request):
        vk_user_id = self.request.query_params.get('vk_user_id')
        applications = StudentApplication.objects.filter(
            vacancy__owner_id=vk_user_id
        )
        application_serializer = StudentApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class GetOutgoingStudentApplicationView(APIView):
    def get(self, request):
        vk_user_id = self.request.query_params.get('vk_user_id')
        applications = StudentApplication.objects.filter(
            student_id=vk_user_id
        )
        application_serializer = StudentApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class AcceptStudentApplicationView(APIView):
    permission_classes = (StudentApplicationAnswerPermission,)

    def post(self, request):
        application_id = request.data.get('student_application_id')
        try:
            application = StudentApplication.objects.get(pk=application_id)
        except StudentApplication.DoesNotExist:
            return get_error_message_response('student_application_id')
        student_id = application.student_id
        tutor_id = application.vacancy.owner_id
        students_table, created = Students.objects.get_or_create(
            tutor_id=tutor_id
        )
        students_table.students.add(student_id)
        Notification.objects.create(
            profile_id=student_id,
            tutor_id=tutor_id,
            event=NotificationEventChoice.STUDENT_APPLICATION_ACCEPT.value
        )
        application.delete()
        return Response(data='OK')


class RejectStudentApplicationView(APIView):
    permission_classes = (StudentApplicationAnswerPermission,)

    def post(self, request):
        application_id = request.data.get('student_application_id')
        try:
            application = StudentApplication.objects.get(pk=application_id)
        except StudentApplication.DoesNotExist:
            return get_error_message_response('student_application_id')
        student_id = application.student_id
        tutor_id = application.vacancy.owner_id
        Notification.objects.create(
            profile_id=student_id,
            tutor_id=tutor_id,
            event=NotificationEventChoice.STUDENT_APPLICATION_REJECT.value
        )
        application.delete()
        return Response(data='OK')
