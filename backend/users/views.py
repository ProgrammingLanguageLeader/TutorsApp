from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from tools.errors import get_error_message_response
from users.models import User
from users.serializers import UserSerializer, UpdateUserSerializer


class RegisterUserView(APIView):
    authentication_classes = None

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if not user_serializer.is_valid():
            return Response(
                data=user_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        User.objects.create()
        user_serializer.save()
        return Response(data='OK')


class UpdateUserView(APIView):
    def post(self, request):
        user_serializer = UpdateUserSerializer(data=request.data)
        if not user_serializer.is_valid():
            return Response(
                data=user_serializer.errors,
                status=HTTP_400_BAD_REQUEST
            )
        try:
            user = User.objects.get(pk=request.data.get('id'))
            for (key, value) in user_serializer.validated_data.items():
                setattr(user, key, value)
            user.save()
        except User.DoesNotExist:
            return get_error_message_response('id')
        return Response(data='OK')


class GetUserView(APIView):
    def get(self, request):
        user_id = self.request.query_params.get('id')
        try:
            user = User.objects.get(pk=user_id)
            user_serializer = UserSerializer(user)
            return Response(data=user_serializer.data)
        except User.DoesNotExist:
            return get_error_message_response('id')


class DeactivateUserView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('id')
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return get_error_message_response('id')
        user.is_active = False
        user.save()
        return Response(data='OK')


class DeleteUserView(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('id')
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return get_error_message_response('id')
        user.delete()
        return Response(data='OK')
