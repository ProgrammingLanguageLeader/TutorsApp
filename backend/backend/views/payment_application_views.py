from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from backend.serializers import PaymentApplicationSerializer
from backend.serializers import GetPaymentApplicationSerializer
from backend.models import PaymentApplication
from backend.models import Notification
from backend.models import NotificationEventChoice
from backend.permissions import PaymentApplicationAnswerPermission

from tools.errors import get_error_message_response


class CreatePaymentApplicationView(APIView):
    def post(self, request):
        student_id = request.data.get('vk_user_id')
        lesson_id = request.data.get('lesson_id')
        request.data['lesson'] = lesson_id
        request.data['student'] = student_id
        application_serializer = PaymentApplicationSerializer(
            data=request.data
        )
        if not application_serializer.is_valid():
            return Response(
                data=application_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        application = application_serializer.save()
        Notification.objects.create(
            profile_id=student_id,
            payment_application_id=application.payment_application_id,
            event=NotificationEventChoice.PAYMENT_APPLICATION_CREATION.value
        )
        return Response(data='OK')


class GetIncomingPaymentApplicationsView(APIView):
    def get(self, request):
        vk_user_id = self.request.query_params.get('vk_user_id')
        applications = PaymentApplication.objects.filter(
            student_id=vk_user_id
        )
        application_serializer = GetPaymentApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class GetOutgoingPaymentApplicationView(APIView):
    def get(self, request):
        vk_user_id = self.request.query_params.get('vk_user_id')
        applications = PaymentApplication.objects.filter(
            lesson__tutor_id=vk_user_id
        )
        application_serializer = GetPaymentApplicationSerializer(
            applications, many=True
        )
        return Response(data=application_serializer.data)


class AcceptPaymentApplicationView(APIView):
    permission_classes = (PaymentApplicationAnswerPermission, )

    def post(self, request):
        application_id = request.data.get('application_application_id')
        try:
            application = PaymentApplication.objects.get(pk=application_id)
        except PaymentApplication.DoesNotExist:
            return get_error_message_response('application_application_id')
        tutor_id = application.lesson.tutor_id
        student_id = application.student_id
        lesson_id = application.lesson_id
        Notification.objects.create(
            profile_id=tutor_id,
            student_id=student_id,
            lesson_id=lesson_id,
            event=NotificationEventChoice.PAYMENT_APPLICATION_ACCEPT.value
        )
        application.delete()
        return Response(data='OK')


class RejectPaymentApplicationView(APIView):
    permission_classes = (PaymentApplicationAnswerPermission, )

    def post(self, request):
        application_id = request.data.get('application_application_id')
        try:
            application = PaymentApplication.objects.get(pk=application_id)
        except PaymentApplication.DoesNotExist:
            return get_error_message_response('application_application_id')
        tutor_id = application.lesson.tutor_id
        student_id = application.student_id
        lesson_id = application.lesson_id
        Notification.objects.create(
            profile_id=tutor_id,
            student_id=student_id,
            lesson_id=lesson_id,
            event=NotificationEventChoice.PAYMENT_APPLICATION_REJECT.value
        )
        application.delete()
        return Response(data='OK')
