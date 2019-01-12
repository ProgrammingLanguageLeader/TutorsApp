from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from notifications.permissions import SelfOnly
from notifications.serializers import NotificationSerializer, \
    SetUnreadNotificationSerializer
from notifications.models import Notification
from notifications.filter import NotificationFilter


class NotificationsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    retrieve:
        Returns the given notification

    list:
        Returns a list of notifications

    set_unread:
        Sets unread field of the given notification
    """
    queryset = Notification.objects.all()
    permission_classes = (SelfOnly,)
    filter_class = NotificationFilter

    def get_queryset(self):
        return Notification.objects.filter(
            recipient=self.request.user
        )

    def get_serializer_class(self):
        if self.action == 'set_unread':
            return SetUnreadNotificationSerializer
        return NotificationSerializer

    @action(detail=True, methods=['patch'],
            name='Set Unread Notification',
            permission_classes=[SelfOnly])
    def set_unread(self, request, pk=None, **kwargs):
        notification = self.get_object()
        notification.unread = request.data.get('unread')
        notification.save()
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)
