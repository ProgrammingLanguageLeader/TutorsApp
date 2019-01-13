from rest_framework import serializers

from tutors.models import StudentRequest
from users.serializers import UserSerializer


class StudentRequestSerializer(serializers.ModelSerializer):
    student = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    tutor = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all()
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
        return attrs


class ReadStudentRequestSerializer(StudentRequestSerializer):
    student = UserSerializer()
    tutor = UserSerializer()


class AcceptStudentRequestSerializer(serializers.Serializer):
    pass
