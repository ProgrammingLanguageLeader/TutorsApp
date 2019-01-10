from django.core.exceptions import ObjectDoesNotExist

from rest_framework import serializers

from lessons.models import Lesson
from tutors.models import Tutor


class LessonSerializer(serializers.ModelSerializer):
    price = serializers.IntegerField(min_value=0, max_value=10000)

    class Meta:
        model = Lesson
        exclude = ('creation_time', 'modification_time', )

    def validate(self, attrs):
        tutor = attrs.get('tutor')
        student = attrs.get('student')
        tutor = Tutor.objects.get(user=tutor)
        try:
            tutor.students.get(pk=student.id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError({
                'student': [
                    'user does not exist is a list of students',
                ]
            })
        return attrs
