from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import ApplicationSerializer
from backend.models import Vacancy, Lesson, Application
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response


class AddApplicationView(APIView):
    @check_authentication
    def post(self, request):
        application_serializer = ApplicationSerializer(data=request.data)
        if application_serializer.is_valid():
            application_serializer.save()
            return Response(data='OK')
        return Response(
            data=application_serializer.errors,
            status=HTTP_400_BAD_REQUEST
        )


class GetApplicationsView(APIView):
    @check_authentication
    def get(self, request):
        vk_id = self.request.query_params.get('vk_id')
        vacancies = Vacancy.objects.filter(
            owner=vk_id
        )
        applications = []
        for vacancy in vacancies:
            current_vacancy_applications = Application.objects.filter(
                vacancy_id=vacancy.id, is_active=True
            )
            for application in current_vacancy_applications:
                applications.append(application)
        application_serializer = ApplicationSerializer(applications, many=True)
        return Response(data=application_serializer.data)


class AcceptApplicationView(APIView):
    @check_authentication
    def post(self, request):
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return get_error_message_response('application_id')
        application.is_active = False
        application.accepted = True
        application.save()
        Lesson.objects.create(
            tutor=application.vacancy.owner,
            student=application.student
        )
        return Response(data='OK')


class DeleteApplicationView(APIView):
    @check_authentication
    def post(self, request):
        try:
            application_id = request.data['id']
            application = Application.objects.get(pk=application_id)
        except Application.DoesNotExist:
            return get_error_message_response('id')
        application.is_active = False
        application.save()
        return Response(data='OK')
