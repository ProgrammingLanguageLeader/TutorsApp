from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from users.serializers import UserSerializer

from tutors.models import TutorStudents

from lessons.models import Lesson


class LessonSerializer(serializers.ModelSerializer):
    tutor = serializers.HiddenField(default=CurrentUserDefault())

    class Meta:
        model = Lesson
        fields = '__all__'
        read_only_fields = ('creation_time', 'modification_time', )

    def validate(self, attrs):
        tutor = self.context['request'].user
        student = attrs.get('student')
        try:
            tutor_students = TutorStudents.objects.get(user=tutor)
            tutor_students.students.get(pk=student.id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError({
                'student': [
                    _('user does not exist is a list of students'),
                ]
            })

        beginning_time = attrs.get('beginning_time')
        duration = attrs.get('duration')
        ending_time = beginning_time + duration
        instance_id = self.instance.id if self.instance else 0
        lessons_count = Lesson.objects.filter(
            ~Q(id=instance_id),
            Q(tutor_id=tutor) | Q(student_id=student),
            Q(
                beginning_time__range=(beginning_time, ending_time)
            ) | Q(
                ending_time__range=(beginning_time, ending_time),
            )
        ).count()
        if lessons_count > 0:
            raise serializers.ValidationError(
                _('lesson timing has collisions with other lessons')
            )
        return attrs


class GetLessonSerializer(LessonSerializer):
    tutor = UserSerializer()
    student = UserSerializer()
