from django_filters import FilterSet

from notifications.models import Notification


class NotificationFilter(FilterSet):
    class Meta:
        model = Notification
        fields = '__all__'
