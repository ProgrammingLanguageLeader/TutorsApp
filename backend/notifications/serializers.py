from rest_framework import serializers

from users.serializers import UserSerializer

from vacancies.models import Vacancy
from vacancies.serializers import VacancySerializer

from notifications.models import Notification


class TargetObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Vacancy):
            serializer = VacancySerializer(value)
            return serializer.data
        raise Exception('Unexpected type of tagged object')


class NotificationSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    recipient = UserSerializer()
    target = TargetObjectRelatedField(read_only=True)

    class Meta:
        model = Notification
        exclude = ('target_object_id', 'target_content_type', )


class SetUnreadNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('unread', )
