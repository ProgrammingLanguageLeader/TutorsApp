from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from tutors.models import StudentRequest, TutorStudents

from users.models import User
from users.serializers import UserSerializer


class StudentRequestSerializer(serializers.ModelSerializer):
    student = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    tutor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = StudentRequest
        fields = '__all__'
        read_only_fields = ('creation_time', )

    def run_validators(self, value):
        try:
            StudentRequest.objects.get(
                student=value.get('student'),
                tutor=value.get('tutor')
            )
        except StudentRequest.DoesNotExist:
            return super().run_validators(value)
        raise serializers.ValidationError(
            _('request already exists')
        )

    def validate(self, attrs):
        student = attrs.get('student')
        tutor = attrs.get('tutor')
        if student == tutor:
            raise serializers.ValidationError(
                _('tutor and student must be different users')
            )
        tutor, created = TutorStudents.objects.get_or_create(user=tutor)
        if student in tutor.students.all():
            raise serializers.ValidationError(
                _('student already exists in a list of students')
            )
        return attrs


class ReadStudentRequestSerializer(StudentRequestSerializer):
    student = UserSerializer()
    tutor = UserSerializer()


class AcceptStudentRequestSerializer(serializers.Serializer):
    pass
