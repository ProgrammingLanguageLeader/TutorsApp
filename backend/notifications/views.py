from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from notifications.permissions import SelfOnly
from notifications.serializers import NotificationSerializer, \
    SetUnreadNotificationSerializer
from notifications.models import Notification


class NotificationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notification.objects.all()
    permission_classes = (SelfOnly,)
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(
            recipient=self.request.user
        )

    @action(detail=True, methods=['patch'], name='Set Unread Notification',
            url_path='set_unread', permission_classes=[SelfOnly])
    def set_unread(self, request, pk=None, **kwargs):
        notification = self.get_object()
        serializer = SetUnreadNotificationSerializer(data=request.data)
        if serializer.is_valid():
            notification.unread = serializer.data['unread']
            notification.save()
        else:
            return Response(serializer.errors, HTTP_400_BAD_REQUEST)
        return Response('OK')
