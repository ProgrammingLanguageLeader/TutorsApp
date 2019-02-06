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

    def validate(self, attrs):
        student = attrs.get('student')
        tutor = attrs.get('tutor')
        if student == tutor:
            raise serializers.ValidationError({
                'tutor': [
                    'tutor must not be equal to student'
                ]
            })
        tutor, created = TutorStudents.objects.get_or_create(user=tutor)
        if student in tutor.students.all():
            raise serializers.ValidationError({
                'student': [
                    'student already exists in a list of students'
                ]
            })
        return attrs


class ReadStudentRequestSerializer(StudentRequestSerializer):
    student = UserSerializer()
    tutor = UserSerializer()


class AcceptStudentRequestSerializer(serializers.Serializer):
    pass
