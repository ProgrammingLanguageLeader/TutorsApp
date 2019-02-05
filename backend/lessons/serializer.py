from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.utils import timezone

from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from users.serializers import UserSerializer

from tutors.models import TutorStudents

from lessons.models import Lesson


class LessonSerializer(serializers.ModelSerializer):
    price = serializers.IntegerField(min_value=0, max_value=10000)

    class Meta:
        model = Lesson
        fields = '__all__'
        read_only_fields = ('creation_time', 'modification_time', )

    def save(self, **kwargs):
        self.validated_data['modification_time'] = timezone.now()
        super().save(**kwargs)

    def validate(self, attrs):
        tutor = attrs.get('tutor')
        student = attrs.get('student')
        try:
            tutor_students = TutorStudents.objects.get(user=tutor)
            tutor_students.students.get(pk=student.id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError({
                'student': [
                    'user does not exist is a list of students',
                ]
            })

        beginning_time = attrs.get('beginning_time')
        ending_time = attrs.get('ending_time')
        if beginning_time >= ending_time:
            raise serializers.ValidationError(
                'beginning_time must be less than ending_time'
            )

        current_lesson_id = self.instance.id if self.instance else 0
        lessons = Lesson.objects.filter(
            ~Q(id=current_lesson_id),
            Q(tutor_id=tutor) | Q(student_id=student),
            Q(
                beginning_time__range=(beginning_time, ending_time)
            ) | Q(
                ending_time__range=(beginning_time, ending_time),
            )
        )
        if len(lessons) > 0:
            raise serializers.ValidationError(
                'lesson timing has collisions with other lessons'
            )
        return attrs


class CreateLessonSerializer(LessonSerializer):
    tutor = serializers.HiddenField(default=CurrentUserDefault())


class GetLessonSerializer(LessonSerializer):
    tutor = UserSerializer()
    student = UserSerializer()
