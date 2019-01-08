from rest_framework import serializers

from tutors.models import Tutor
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
