from rest_framework import serializers

from tutors.models import Tutor, StudentRequest
from users.serializers import UserSerializer


class TutorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    students = UserSerializer(many=True)

    class Meta:
        model = Tutor
        fields = '__all__'


class DeleteStudentSerializer(serializers.Serializer):
    student = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all()
    )


class StudentRequestSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all()
    )
    tutor = serializers.PrimaryKeyRelatedField(
        queryset=UserSerializer.Meta.model.objects.all()
    )

    class Meta:
        model = StudentRequest
        fields = '__all__'
        read_only_fields = ('creation_time', )


class ReadStudentRequestSerializer(StudentRequestSerializer):
    student = UserSerializer()
    tutor = UserSerializer()
