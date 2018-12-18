from rest_framework.views import APIView
from rest_framework.response import Response

from backend.serializers import GetNotificationSerializer
from backend.models import Notification
from backend.views.tools import check_authentication
from backend.views.tools import get_error_message_response
from backend.permissions import MarkNotificationAsSeenPermission


class GetNotificationsView(APIView):
    @staticmethod
    def validate_offset(offset):
        try:
            offset = int(offset)
            return offset
        except (ValueError, TypeError):
            return None

    @staticmethod
    def validate_limit(limit):
        try:
            limit = int(limit)
            if not (1 <= limit <= 1000):
                return None
            return limit
        except (ValueError, TypeError):
            return None

    @check_authentication
    def get(self, request):
        params = self.request.query_params
        vk_user_id = params.get('vk_user_id')
        offset = self.validate_offset(params.get('offset') or 0)
        if offset is None:
            return get_error_message_response('offset')

        limit = self.validate_limit(params.get('limit') or 100)
        if limit is None:
            return get_error_message_response('limit')
        notifications = Notification.objects.filter(
            profile_id=vk_user_id
        ).order_by('-creation_time')[offset:offset + limit]
        notifications_serializer = GetNotificationSerializer(
            notifications, many=True
        )
        return Response(data=notifications_serializer.data)


class MarkNotificationAsSeenView(APIView):
    permission_classes = (MarkNotificationAsSeenPermission, )

    @check_authentication
    def post(self, request):
        notification_id = request.data.get('notification_id')
        try:
            notification = Notification.objects.get(pk=notification_id)
        except Notification.DoesNotExist:
            return get_error_message_response('notification_id')
        notification.seen = True
        notification.save()
        return Response(data='OK')
