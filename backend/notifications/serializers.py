from rest_framework import serializers

from users.serializers import UserSerializer

from vacancies.models import Vacancy
from vacancies.serializers import VacancySerializer

from lessons.models import Lesson
from lessons.serializer import LessonSerializer

from tutors.models import StudentRequest
from tutors.serializers import StudentRequestSerializer

from notifications.models import Notification


class TargetObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        serializer_data = None
        if isinstance(value, Vacancy):
            serializer = VacancySerializer(value)
            serializer_data = serializer.data
            serializer_data['content_type'] = 'vacancy'
        if isinstance(value, StudentRequest):
            serializer = StudentRequestSerializer(value)
            serializer_data = serializer.data
            serializer_data['content_type'] = 'student_request'
        if isinstance(value, Lesson):
            serializer = LessonSerializer(value)
            serializer_data = serializer.data
            serializer_data['content_type'] = 'lesson'
        if not serializer_data:
            raise Exception('Unexpected type of tagged object')
        return serializer_data


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
